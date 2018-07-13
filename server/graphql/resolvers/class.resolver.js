import { TermSchedule, Subject } from "../../models/class.model";
import { CLERK, FACULTY, DEAN, ASSOCIATE_DEAN } from "../../models/user.model";
import { getDifference } from "../../utils/array";
import {
    addSubjectToFaculties,
    removeSubjectFromFaculties,
} from "../../utils/faculty_subject_link";
import {
    AUTHENTICATED_USERS,
    limitAccess,
    NO_FACULTY,
} from "../../utils/user_decorator";
import { DoesNotExistError } from "../errors/does_not_exist.error";
import { ValidationError } from "../errors/validation.error";
import { TERM_STATUSES } from "../../models/enums/class.enums";
import { getUserFromContext } from "../../utils/user_from_context";
import { Faculty } from "../../models/faculty.model";

const DEFAULT_DAY_AVAILABILITY = {
    "7-9": false,
    "9-11": false,
    "11-1": false,
    "1-3": false,
    "3-5": false,
    "5-7": false,
};

const subjects = () => Subject.find();

const mutateSubject = () => ({
    async add({ newSubject }) {
        // Link subject to faculties
        const subject = await Subject.create(newSubject);

        // Link faculties to subject
        addSubjectToFaculties(subject, newSubject.faculties);

        return Subject.findById(subject._id);
    },

    async update({ _id, newSubject }) {
        // Link subject to faculties
        const subject = await Subject.findById(_id).exec();

        // Subject.faculties is an array of ObjectIds,
        // convert them to string for getDifference() to work properly
        const oldFaculties = subject.faculties.map(objectId =>
            objectId.toString()
        );
        const newFaculties = newSubject.faculties;

        subject.set(newSubject);
        await subject.save();

        if (newFaculties !== undefined) {
            const { addedItems, removedItems } = getDifference(
                newFaculties,
                oldFaculties
            );

            // Link faculties to subject
            addSubjectToFaculties(subject, addedItems);
            removeSubjectFromFaculties(subject, removedItems);
        }

        return subject;
    },
});

const termSchedules = () => TermSchedule.find().exec();

const mutateClasses = termSchedule => ({
    async add({ newClass: newClassInput }) {
        const newClass = termSchedule.classes.create(newClassInput);
        termSchedule.classes.push(newClass);
        await termSchedule.save();
        return newClass;
    },

    async update({ _id, newClass: newClassInput }) {
        const classSchedule = termSchedule.classes.id(_id);
        if (!classSchedule) {
            throw new DoesNotExistError(`Class of ID ${_id} does not exist`);
        }

        if (newClassInput.faculty) {
            const faculty = await Faculty.findById(newClassInput.faculty).exec();
            if (!faculty) {
                throw new DoesNotExistError(
                    `Faculty of ID ${facultyId} does not exist`
                );
            }
        }

        classSchedule.set(newClassInput);
        await termSchedule.save();
        return classSchedule;
    },

    async remove({ _id }) {
        const oldClass = termSchedule.classes.id(_id);
        oldClass.remove();
        await termSchedule.save();
        return termSchedule.classes.id(_id) === null;
    },
});

const mutateStatus = termSchedule => ({
    async advance() {
        if (termSchedule.status === "PUBLISHED") {
            throw new ValidationError(
                "Cannot advance status of a published termSchedule"
            );
        }

        termSchedule.status =
            TERM_STATUSES[TERM_STATUSES.indexOf(termSchedule.status) + 1];
        await termSchedule.save();
        return termSchedule.status;
    },

    async return() {
        if (termSchedule.status === "INITIALIZING") {
            throw new ValidationError(
                "Cannot return from status of an initializing termSchedule"
            );
        }

        if (termSchedule.status === "ARCHIVED") {
            throw new ValidationError(
                "Cannot unarchive an archived termSchedule"
            );
        }

        termSchedule.status =
            TERM_STATUSES[TERM_STATUSES.indexOf(termSchedule.status) - 1];
        await termSchedule.save();
        return termSchedule.status;
    },
});

async function mutateTerm(object, { _id }) {
    const termSchedule = await TermSchedule.findById(_id).exec();
    if (!termSchedule) {
        throw new DoesNotExistError(`TermSchedule of ID ${_id} does not exist`);
    }

    return {
        async addFacultiesToPool({ faculties: newFacultiesId }) {
            const facultyPool = termSchedule.facultyPool;
            const oldFacultiesId = facultyPool.map(facultyResponse =>
                facultyResponse.faculty._id.toString()
            );

            newFacultiesId
                // Cannot have duplicates
                .filter(facultyId => !oldFacultiesId.includes(facultyId))
                .forEach(facultyId =>
                    facultyPool.push(
                        facultyPool.create({
                            faculty: facultyId,
                            availability: {
                                M_TH: { ...DEFAULT_DAY_AVAILABILITY },
                                T_F: { ...DEFAULT_DAY_AVAILABILITY },
                            },
                            feedback: null,
                        })
                    )
                );

            await termSchedule.save();
            return facultyPool;
        },

        classes: mutateClasses(termSchedule),
        status: mutateStatus(termSchedule),
    };
}

async function addTermSchedule(object, { startYear, term }) {
    const termSchedule = await TermSchedule.findOne({ startYear, term }).exec();

    if (termSchedule) {
        return termSchedule;
    }

    await TermSchedule.update(
        {},
        { status: "ARCHIVED" },
        { multi: true }
    ).exec();

    return TermSchedule.create({
        startYear,
        term,
        facultyPool: [],
        classes: [],
        status: "INITIALIZING",
    });
}

async function setFacultyAvailability(
    object,
    { availability, termScheduleId },
    context
) {
    const termSchedule = await TermSchedule.findById(termScheduleId).exec();
    if (!termSchedule) {
        throw new DoesNotExistError(
            `TermSchedule of ID ${termScheduleId} does not exist`
        );
    }

    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({ user: user._id });

    const facultyResponse = termSchedule.facultyPool.find(
        response => response.faculty === faculty._id
    );
    facultyResponse.availability = availability;
    await termSchedule.save();
    return true;
}

export const queryResolvers = {
    subjects: limitAccess(subjects, {
        allowed: AUTHENTICATED_USERS,
        action: "Get all subjects",
    }),
    termSchedules: limitAccess(termSchedules, {
        allowed: NO_FACULTY,
        action: "Get all TermSchedules",
    }),
};

export const mutationResolvers = {
    subject: limitAccess(mutateSubject, {
        allowed: CLERK,
        action: "Mutate subject",
    }),
    addTermSchedule: limitAccess(addTermSchedule, {
        allowed: [DEAN, ASSOCIATE_DEAN],
        action: "Add termSchedule",
    }),
    termSchedule: limitAccess(mutateTerm, {
        allowed: [CLERK, DEAN, ASSOCIATE_DEAN],
        action: "Mutate termSchedule",
    }),
    setFacultyAvailability: limitAccess(setFacultyAvailability, {
        allowed: FACULTY,
        action: "Set faculty availability",
    }),
};

import { TermSchedule, Course, Subject } from "../../models/class.model";
import { CLERK } from "../../models/user.model";
import { getDifference } from "../../utils/array";
import { addSubjectToFaculties, removeSubjectFromFaculties } from "../../utils/faculty_subject_link";
import { AUTHENTICATED_USERS, limitAccess, NO_FACULTY } from "../../utils/user_decorator";
import { DoesNotExistError } from "../errors/does_not_exist.error";

const DEFAULT_DAY_AVAILABILITY = {
    "7-9": false,
    "9-11": false,
    "11-1": false,
    "1-3": false,
    "3-5": false,
};

function subjects() {
    return Subject.find();
}

function mutateSubject() {
    return {
        async add({ newSubject }) {
            // Link subject to faculties
            const subject = await Subject.create(newSubject);

            // Link faculties to subject
            addSubjectToFaculties(subject, newSubject.faculties);

            return Subject
                .findById(subject._id);
        },

        async update({ _id, newSubject }) {
            // Link subject to faculties
            const subject = await Subject
                .findById(_id)
                .exec();

            // Subject.faculties is an array of ObjectIds,
            // convert them to string for getDifference() to work properly
            const oldFaculties = subject.faculties.map(objectId => objectId.toString());
            const newFaculties = newSubject.faculties;

            subject.set(newSubject);
            await subject.save();

            if (newFaculties !== undefined) {
                const { addedItems, removedItems } = getDifference(newFaculties, oldFaculties);

                // Link faculties to subject
                addSubjectToFaculties(subject, addedItems);
                removeSubjectFromFaculties(subject, removedItems);
            }

            return subject;
        },
    };
}

const mutateClasses = termSchedule => ({
    async add({ newClass: newClassInput }) {
        const newClass = termSchedule.classes.create(newClassInput);
        termSchedule.classes.push(newClass);
        await termSchedule.save();
        return newClass;
    },

    async remove({ _id }) {
        const oldClass = termSchedule.classes.id(_id);
        oldClass.remove();
        await termSchedule.save();
        return termSchedule.classes.id(_id) === null;
    }
});

const mutateStatus = termSchedule => ({
    advance() {
        // TODO
    },

    return() {
        // TODO
    }
});

async function mutateTerm(object, { _id }) {
    const termSchedule = await TermSchedule.findById(id).exec();
    if (!termSchedule) {
        throw new DoesNotExistError(`TermSchedule of ID ${_id} does not exist`);
    }

    return {
        async setFacultyPool({ faculties: newFacultiesId }) {
            const facultyPool = termSchedule.facultyPool;
            const oldFacultiesId = facultyPool.map(facultyResponse => facultyResponse.faculty._id);
            const addedFaculties = newFacultiesId.filter(id => oldFacultiesId.includes(id));

            const newFacultyResponses = addedFaculties.map(facultyId => facultyPool.create({
                faculty: facultyId,
                availability: {
                    "M_TH": { ...DEFAULT_DAY_AVAILABILITY },
                    "T_F": { ...DEFAULT_DAY_AVAILABILITY }
                },
                feedback: {
                    status: null,
                }
            }));

            newFacultyResponses.forEach(newFacultyResponse => facultyPool.push(newFacultyResponse));

            await termSchedule.save();
            return facultyPool;
        },

        course: mutateClasses(termSchedule),
        status: mutateStatus(termSchedule),
    };
}

export const queryResolvers = {
    subjects: limitAccess(subjects, { allowed: AUTHENTICATED_USERS, action: "Get all subjects" }),
};

export const mutationResolvers = {
    subject: limitAccess(mutateSubject, { allowed: CLERK, action: "Mutate subject" }),
};

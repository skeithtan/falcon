import { limitAccess } from "../../utils/user_decorator";
import { FACULTY } from "../../models/user.model";
import { getUserFromContext } from "../../utils/user_from_context";
import { Faculty } from "../../models/faculty.model";
import { TermSchedule } from "../../models/class.model";
import { ValidationError } from "../errors/validation.error";

const termScheduleToFacultyFormat = (termSchedule, faculty) => {
    const facultyResponse = termSchedule.facultyPool.find(
        facultyResponse =>
            String(facultyResponse.faculty) === String(faculty._id)
    );

    const classes = termSchedule.classes
        // Remove all classes without faculties
        .filter(classSchedule => classSchedule.faculty !== null)
        // Get only classes whose faculty is the current user
        .filter(
            classSchedule =>
                String(classSchedule.faculty) === String(faculty._id)
        );

    return {
        _id: termSchedule._id,
        status: termSchedule.status,
        startYear: termSchedule.startYear,
        term: termSchedule.term,
        involved: Boolean(facultyResponse),
        classes,
        availability: facultyResponse ? facultyResponse.availability : null,
        feedback: facultyResponse ? facultyResponse.feedback : null,
    };
};

const getCurrentSchedule = async faculty => {
    const currentTermSchedule =
        // Regex specifies that the status string must be exactly "ARCHIVED"
        // More information: https://simple-regex.com/build/5b4c4ffbba250
        await TermSchedule.findOne({
            status: { $not: /(?:ARCHIVED)$/ },
        }).exec();

    return termScheduleToFacultyFormat(currentTermSchedule, faculty);
};

const getArchivedSchedule = async faculty => {
    const archivedTermSchedules = await TermSchedule.find({
        status: "ARCHIVED",
    }).exec();
    return archivedTermSchedules.map(termSchedule =>
        termScheduleToFacultyFormat(termSchedule, faculty)
    );
};

const mySchedules = async (object, args, context) => {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({ user: user._id }).exec();

    return {
        current: getCurrentSchedule(faculty),
        archived: getArchivedSchedule(faculty),
    };
};

const setFacultyAvailability = async (object, { availability }, context) => {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({ user: user._id }).exec();

    const currentTermSchedule = await TermSchedule.findOne({
        status: { $not: /(?:ARCHIVED)$/ },
    }).exec();

    if (!currentTermSchedule) {
        throw new ValidationError("No current term schedule found");
    }

    const facultyResponse = currentTermSchedule.facultyPool.find(
        response => response.faculty.toString() === faculty._id.toString()
    );

    if (!facultyResponse) {
        throw new ValidationError(
            "Current faculty is not involved in current term."
        );
    }

    facultyResponse.availability = availability;
    await currentTermSchedule.save();

    return true;
};

const setFacultyFeedback = async (
    object,
    { status, rejectionReason, newAvailability },
    context
) => {
    const user = await getUserFromContext(context);
    const faculty = await Faculty.findOne({ user: user._id }).exec();

    const currentTermSchedule = await TermSchedule.findOne({
        status: { $not: /(?:ARCHIVED)$/ },
    }).exec();

    if (!currentTermSchedule) {
        throw new ValidationError("No current term schedule found");
    }

    const facultyResponse = currentTermSchedule.facultyPool.find(
        response => response.faculty.toString() === faculty._id.toString()
    );

    if (!facultyResponse) {
        throw new ValidationError(
            "Current faculty is not involved in current term."
        );
    }

    facultyResponse.feedback = {
        submitted: new Date().toString(),
        status: status,
        rejectionReason: status === "REJECTED" ? rejectionReason : null,
        isDirty: false,
    };

    if (newAvailability) {
        facultyResponse.availability = newAvailability;
    }

    await currentTermSchedule.save();
    return facultyResponse.feedback;
};

export const queryResolvers = {
    mySchedules: limitAccess(mySchedules, {
        allowed: FACULTY,
        action: "View my schedule",
    }),
};

export const mutationResolvers = {
    setFacultyAvailability: limitAccess(setFacultyAvailability, {
        allowed: FACULTY,
        action: "Set current faculty availability",
    }),
    setFacultyFeedback: limitAccess(setFacultyFeedback, {
        allowed: FACULTY,
        action: "Set current faculty feedback",
    }),
};

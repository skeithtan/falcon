import { FACULTY_FEEDBACK, TERM_STATUSES } from "../enums/class.enums";

export const getPendingWarnings = termSchedule => {
    let warnings = [];
    const pendingAvailabilityCount = termSchedule.facultyPool.filter(
        response => response.availability === null
    ).length;

    const facultyString =
        pendingAvailabilityCount > 1 ? "faculty members" : "faculty member";

    if (pendingAvailabilityCount > 0) {
        warnings.push({
            message: `${pendingAvailabilityCount} ${facultyString} have not yet submited their availability.`,
            isSevere: false,
        });
    }

    return warnings;
};

export const getNoFeedbackWarnings = termSchedule => {
    let warnings = [];

    const noFeedbackCount = termSchedule.facultyPool.filter(
        response => response.feedback === null
    ).length;

    const facultyString =
        noFeedbackCount > 1 ? "faculty members" : "faculty member";

    if (noFeedbackCount > 0) {
        warnings.push({
            message: `${noFeedbackCount} ${facultyString} have not yet given their feedback`,
            isSevere: false,
        });
    }

    return warnings;
};

export const getRejectionWarnings = termSchedule => {
    let warnings = [];

    const rejectionCount = termSchedule.facultyPool.filter(
        response =>
            response.feedback &&
            response.feedback.status === FACULTY_FEEDBACK.REJECTED.identifier
    ).length;

    const verbString = rejectionCount > 1 ? "have" : "has";

    if (rejectionCount > 0) {
        warnings.push({
            message: `${rejectionCount} ${verbString} rejected the proposed schedule`,
            isSevere: false,
        });
    }

    return warnings;
};

export const getUnassignedWarnings = termSchedule => {
    let warnings = [];

    const unassignedCount = termSchedule.classes.filter(
        classSchedule => classSchedule.faculty === null
    ).length;

    const classesString = unassignedCount > 1 ? "classes have" : "class has";

    if (unassignedCount > 0) {
        warnings.push({
            message: `${unassignedCount} ${classesString} no assigned faculty`,
            isSevere:
                termSchedule.status ===
                TERM_STATUSES.FEEDBACK_GATHERING.identifier,
        });
    }

    return warnings;
};

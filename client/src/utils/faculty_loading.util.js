import moment from "moment";
import {
    TERMS,
    MEETING_DAYS,
    MEETING_HOURS,
    TERM_STATUSES,
    FACULTY_FEEDBACK,
} from "../enums/class.enums";
import { EMPLOYMENT } from "../enums/faculty.enums";
import groupBy from "lodash/groupBy";

const now = moment();

const PLANNING_MONTHS = [
    {
        term: TERMS.FIRST,
        months: ["May", "June"],
    },
    {
        term: TERMS.SECOND,
        months: ["August", "September"],
    },
    {
        term: TERMS.THIRD,
        months: ["December", "January"],
    },
];
const getTermToPlan = () => {
    const monthNow = now.format("MMMM");
    const yearNow = Number(now.format("YYYY"));

    for (const { term, months } of PLANNING_MONTHS) {
        if (months.includes(monthNow)) {
            return {
                term: term.identifier,
                // Third term's start year is always the year before
                startYear: term === TERMS.THIRD ? yearNow - 1 : yearNow,
            };
        }
    }

    return null;
};

export const termToPlan = getTermToPlan();

export const formatAcademicYear = startYear =>
    `${startYear} - ${startYear + 1}`;

export const termScheduleToString = termSchedule => {
    const term = TERMS[termSchedule.term].name;
    const academicYear = formatAcademicYear(termSchedule.startYear);
    return `${term} Term ${academicYear}`;
};

export const meetingDaysFromPath = path =>
    Object.values(MEETING_DAYS).find(meetingDays => meetingDays.path === path);

export const mapClassScheduleToGraphQLInput = ({
    subject,
    meetingDays,
    meetingHours,
    room,
    enrollmentCap,
    course,
    section,
    faculty,
}) => ({
    subject,
    meetingDays,
    meetingHours,
    room,
    enrollmentCap,
    course,
    section,
    faculty: faculty === "" ? null : faculty,
});

// Validation
export const computeFacultyClassCompatibility = (
    faculty,
    assignedClasses,
    classSchedule,
    availability
) => {
    const compatibility = [
        {
            criteria: "Faculty-subject compatibility",
            get isCompatible() {
                return faculty.teachingSubjects.includes(classSchedule.subject);
            },
            get message() {
                return this.isCompatible
                    ? "This subject is within this faculty's expertise"
                    : "This subject is not within this faculty's expertise";
            },
        },
        {
            criteria: "Faculty time availability",
            get isCompatible() {
                if (!availability) {
                    return null;
                }

                return availability[classSchedule.meetingDays].includes(
                    classSchedule.meetingHours
                );
            },
            get message() {
                if (this.isCompatible) {
                    return "This faculty is available at this time";
                } else if (this.isCompatible === null) {
                    return "This faculty has not submitted their time availability";
                } else {
                    return "This faculty is not available during these hours";
                }
            },
        },
        {
            criteria: "Third consecutive class",
            get isCompatible() {
                const { meetingHours, meetingDays } = classSchedule;
                // The first two meeting hours means it is never the third consecutive
                if (meetingHours === "7-9" || meetingHours === "9-11") {
                    return true;
                }

                const assignedHoursForDay = assignedClasses
                    // Get only classes from the day itself
                    .filter(item => item.meetingDays === meetingDays)
                    // Get only the meeting hours of these classes
                    .map(item => item.meetingHours);

                // TODO: Look forward
                const twoMeetingHoursBefore = getTwoMeetingHoursBefore(
                    meetingHours
                );

                return !twoMeetingHoursBefore.every(hours =>
                    assignedHoursForDay.includes(hours)
                );
            },
            get message() {
                return this.isCompatible
                    ? "This class is not the third consecutive"
                    : "This class is the third consecutive class";
            },
        },
        {
            criteria: "Class time conflict",
            get isCompatible() {
                const { meetingDays, meetingHours } = classSchedule;

                return (
                    assignedClasses
                        // Get only assigned classes from that day
                        .filter(item => item.meetingDays === meetingDays)
                        // Remove candidate from list
                        .filter(item => item._id !== classSchedule._id)
                        // Ensure it's unique
                        .every(item => item.meetingHours !== meetingHours)
                );
            },
            get message() {
                return this.isCompatible
                    ? "This class does not conflict with other classes"
                    : "This faculty has another class within these hours";
            },
        },
    ];

    return {
        compatibility,
        isCompatible: compatibility.every(
            criteria =>
                // Consider unknown (null) criterias as compatible
                criteria.isCompatible || criteria.isCompatible === null
        ),
    };
};

const getTwoMeetingHoursBefore = meetingHours => {
    const allMeetingHours = Object.values(MEETING_HOURS).map(
        item => item.identifier
    );
    const candidateIndex = allMeetingHours.indexOf(meetingHours);

    // Ensure this is at least the third or above, else null
    if (candidateIndex < 2) {
        return null;
    }

    return [
        allMeetingHours[candidateIndex - 1],
        allMeetingHours[candidateIndex - 2],
    ];
};

const AVAILABILITY_SORT = ["Pending Availability", "Availability submitted"];

const FEEDBACK_SORT = [
    "Pending Feedback",
    `${FACULTY_FEEDBACK.REJECTED.name} Schedule`,
    `${FACULTY_FEEDBACK.ACCEPTED.name} Schedule`,
];

const LOADING_SORT = [
    "Unassigned",
    "Underloaded",
    "Overloaded",
    "Within Range",
];

export const categorizeFaculties = (faculties, termScheduleStatus, classes) => {
    let categorized = {};
    let sortArray = [];

    switch (termScheduleStatus) {
        case TERM_STATUSES.INITIALIZING.identifier:
            categorized = categorizeByAvailability(faculties);
            sortArray = AVAILABILITY_SORT;
            break;
        case TERM_STATUSES.FEEDBACK_GATHERING.identifier:
            categorized = categorizeByFeedback(faculties);
            sortArray = FEEDBACK_SORT;
            break;
        default:
            categorized = categorizeByLoading(faculties, classes);
            sortArray = LOADING_SORT;
            break;
    }

    const groupedByCategory = groupBy(categorized, "category");
    return Object.entries(groupedByCategory).sort((a, b) => {
        // Sort category with the same order as sortArray
        const aCategory = a[0];
        const bCategory = b[0];

        return sortArray.indexOf(aCategory) - sortArray.indexOf(bCategory);
    });
};

const categorizeByAvailability = faculties =>
    faculties.map(faculty => {
        const { facultyResponse } = faculty;
        return {
            ...faculty,
            category:
                facultyResponse.availability === null
                    ? "Pending Availability"
                    : "Availability submitted",
        };
    });

const categorizeByFeedback = faculties =>
    faculties.map(faculty => {
        const {
            facultyResponse: { feedback },
        } = faculty;

        return {
            ...faculty,
            category:
                feedback === null
                    ? "Pending Feedback"
                    : `${FACULTY_FEEDBACK[feedback.status].name} Schedule`,
        };
    });

const categorizeByLoading = (faculties, classes) =>
    faculties.map(faculty => {
        const {
            faculty: { _id, employment },
        } = faculty;
        const assignedClassesCount = classes.filter(
            classSchedule => classSchedule.faculty === _id
        ).length;

        if (assignedClassesCount === 0) {
            return {
                ...faculty,
                category: "Unassigned",
            };
        }

        const { min, max } = EMPLOYMENT[employment].load;

        if (assignedClassesCount < min) {
            return {
                ...faculty,
                category: "Underloaded",
            };
        }

        if (assignedClassesCount > max) {
            return {
                ...faculty,
                category: "Overloaded",
            };
        }

        return {
            ...faculty,
            category: "Within Range",
        };
    });

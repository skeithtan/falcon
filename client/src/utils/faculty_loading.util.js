import moment from "moment";
import { TERMS, MEETING_DAYS, MEETING_HOURS } from "../enums/class.enums";

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
                term,
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
) => [
    {
        criteria: "Subject is faculty's expertise",
        get isCompatible() {
            return faculty.teachingSubjects.includes(classSchedule.subject);
        },
    },
    {
        criteria: "Faculty is available at this time",
        get isCompatible() {
            if (!availability) {
                return false;
            }

            return availability[classSchedule.meetingDays].includes(
                classSchedule.meetingHours
            );
        },
    },
    {
        criteria: "Class is not the third consecutive",
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
    },
    {
        criteria: "Does not conflict with other classes",
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
    },
];

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

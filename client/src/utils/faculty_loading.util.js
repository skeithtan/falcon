import moment from "moment";
import { TERMS } from "../enums/class.enums";


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

    for (const {term, months} of PLANNING_MONTHS) {
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
    return `${term} term ${academicYear}`;
};
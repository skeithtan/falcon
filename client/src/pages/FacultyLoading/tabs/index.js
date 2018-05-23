import CoursesTab from "./Courses";
import SubjectsTab from "./Subjects";
import TermsScheduleTab from "./TermsSchedule";


export const TERMS_SCHEDULE_TAB = {
    name: "Terms Schedule",
    identifier: "TERMS_SCHEDULE",
    path: "terms-schedule",
    component: TermsScheduleTab,
};

export const SUBJECTS_TAB = {
    name: "Subjects",
    identifier: "SUBJECTS",
    path: "subjects",
    component: SubjectsTab,
};

export const COURSES_TAB = {
    name: "Courses",
    identifier: "COURSES",
    path: "courses",
    component: CoursesTab,
};

export const TABS = [
    TERMS_SCHEDULE_TAB,
    SUBJECTS_TAB,
    COURSES_TAB,
];

export function getTabFromPath(candidatePath) {
    return TABS.find(tab => tab.path === candidatePath);
}

export function getTabFromIdentifier(candidateIdentifier) {
    return TABS.find(tab => tab.identifier === candidateIdentifier);
}
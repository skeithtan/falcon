export const TERMS_SCHEDULE_TAB = {
    name: "Terms Schedule",
    identifier: "TERMS_SCHEDULE",
    component: null,
};

export const SUBJECTS_TAB = {
    name: "Subjects",
    identifier: "SUBJECTS",
    component: null,
};

export const COURSES_TAB = {
    name: "Courses",
    identifier: "COURSES",
    component: null,
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
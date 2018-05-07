export const DEGREES_TAB = {
    name: "Degrees",
    identifier: "DEGREES",
    route: "degrees/",
    component: null,
};

export const TEACHING_SUBJECTS_TAB = {
    name: "Teaching Subjects",
    identifier: "TEACHING_SUBJECTS",
    route: "teaching-subjects/",
    component: null,
};

export const PRESENTATIONS_TAB = {
    name: "Presentations",
    identifier: "PRESENTATIONS",
    route: "presentations/",
    component: null,
};

export const RECOGNITIONS_TAB = {
    name: "Recognitions",
    identifier: "RECOGNITIONS",
    route: "recognitions/",
    component: null,
};

export const INSTRUCTIONAL_MATERIALS_TAB = {
    name: "Instructional Materials",
    identifier: "INSTRUCTIONAL_MATERIALS",
    route: "instructional-materials/",
    component: null,
};

export const EXTENSION_WORKS_TAB = {
    name: "Extension Works",
    identifier: "EXTENSION_WORKS",
    route: "extension-works/",
    component: null,
};


export const TABS = [
    DEGREES_TAB,
    TEACHING_SUBJECTS_TAB,
    PRESENTATIONS_TAB,
    RECOGNITIONS_TAB,
    INSTRUCTIONAL_MATERIALS_TAB,
    EXTENSION_WORKS_TAB,
];

export function getTabFromIdentifier(candidateIdentifier) {
    for (const [index, {identifier}] of TABS.entries()) {
        if (identifier === candidateIdentifier) {
            return TABS[index];
        }
    }

    return null;
}
export const OVERVIEW_TAB = {
    name: "Overview",
    identifier: "OVERVIEW",
    route: "overview/",
    component: null,
};

export const PRESENTATIONS_TAB = {
    name: "Presentations",
    identifier: "PRESENTATIONS",
    route: "presentations/",
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
    OVERVIEW_TAB,
    PRESENTATIONS_TAB,
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
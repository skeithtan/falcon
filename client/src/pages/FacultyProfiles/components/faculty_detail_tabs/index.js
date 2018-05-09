import OverviewTab from "./OverviewTab";
import PresentationsTab from "./PresentationsTab";
import InstructionalMaterialTab from "./InstructionalMaterialsTab";
import ExtensionWorksTab from "./ExtensionWorksTab";

export const OVERVIEW_TAB = {
    name: "Overview",
    identifier: "OVERVIEW",
    route: "overview/",
    component: OverviewTab,
};

export const PRESENTATIONS_TAB = {
    name: "Presentations",
    identifier: "PRESENTATIONS",
    route: "presentations/",
    component: PresentationsTab,
};

export const INSTRUCTIONAL_MATERIALS_TAB = {
    name: "Instructional Materials",
    identifier: "INSTRUCTIONAL_MATERIALS",
    route: "instructional-materials/",
    component: InstructionalMaterialTab,
};

export const EXTENSION_WORKS_TAB = {
    name: "Extension Works",
    identifier: "EXTENSION_WORKS",
    route: "extension-works/",
    component: ExtensionWorksTab,
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
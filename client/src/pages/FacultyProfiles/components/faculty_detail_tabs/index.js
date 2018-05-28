import { ExtensionWorksTab } from "./ExtensionWorksTab";
import { InstructionalMaterialsTab } from "./InstructionalMaterialsTab";
import { OverviewTab } from "./OverviewTab";
import { PresentationsTab } from "./PresentationsTab";


export const OVERVIEW_TAB = {
    name: "Overview",
    identifier: "OVERVIEW",
    component: OverviewTab,
};
export const PRESENTATIONS_TAB = {
    name: "Presentations",
    identifier: "PRESENTATIONS",
    component: PresentationsTab,
};
export const INSTRUCTIONAL_MATERIALS_TAB = {
    name: "Instructional Materials",
    identifier: "INSTRUCTIONAL_MATERIALS",
    component: InstructionalMaterialsTab,
};
export const EXTENSION_WORKS_TAB = {
    name: "Extension Works",
    identifier: "EXTENSION_WORKS",
    component: ExtensionWorksTab,
};
export const TABS = [
    OVERVIEW_TAB,
    PRESENTATIONS_TAB,
    INSTRUCTIONAL_MATERIALS_TAB,
    EXTENSION_WORKS_TAB,
];

export function getTabFromPath(candidatePath) {
    return TABS.find(tab => tab.path === candidatePath);
}

export function getTabFromIdentifier(candidateIdentifier) {
    return TABS.find(tab => tab.identifier === candidateIdentifier);
}
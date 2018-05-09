import SignInPage from "./SignIn";
import HomePage from "./Home";
import FacultyProfilesPage from "./FacultyProfiles";
import {
    BLUE_THEME,
    GREY_THEME,
    INDIGO_THEME,
    PINK_THEME,
    PNU_THEME,
    TEAL_THEME,
} from "./themes";

export const SIGN_IN_PAGE = {
    identifier: "SIGN_IN_PAGE",
    path: "sign-in",
    component: SignInPage,
    theme: PNU_THEME,
};

export const FACULTY_PROFILES_PAGE = {
    identifier: "FACULTY_PROFILES_PAGE",
    path: "faculty-profiles",
    component: FacultyProfilesPage,
    name: "Faculty Profiles",
    theme: TEAL_THEME,
};

export const HOME_PAGE = {
    identifier: "HOME_PAGE",
    path: "home",
    component: HomePage,
    name: "Home",
    theme: PNU_THEME,
};

export const FACULTY_LOADING_PAGE = {
    identifier: "FACULTY_LOADING_PAGE",
    path: "faculty-loading",
    name: "Faculty Loading",
    theme: INDIGO_THEME,
};

export const TRACER_STUDY_PAGE = {
    identifier: "TRACER_STUDY_PAGE",
    path: "tracer-study",
    name: "Tracer Study",
    theme: BLUE_THEME,
};

export const USER_SETTINGS_PAGE = {
    identifier: "USER_SETTINGS_PAGE",
    path: "users",
    name: "Users",
    theme: GREY_THEME,
};

export const NOT_FOUND_PAGE = {
    identifier: "NOT_FOUND_PAGE",
    path: "404",
    theme: PINK_THEME,
};

export const MODULE_PAGES = [
    HOME_PAGE,
    FACULTY_PROFILES_PAGE,
    FACULTY_LOADING_PAGE,
    TRACER_STUDY_PAGE,
    USER_SETTINGS_PAGE,
];

export const PAGES = [
    SIGN_IN_PAGE,
    NOT_FOUND_PAGE,
    ...MODULE_PAGES,
];

export function getPageFromPath(candidatePath) {
    for (const [index, {path}] of PAGES.entries()) {
        // It must start with, not be equal to, because the path could have a descendant
        // E.g.: /faculty-profiles/Melinda vs /faculty-profiles
        if (candidatePath.startsWith(path)) {
            return PAGES[index];
        }
    }

    // If path is not found, it means path is invalid, return not found
    return NOT_FOUND_PAGE;
}

export function getPageFromIdentifier(candidateIdentifier) {

    for (const [index, {identifier}] of PAGES.entries()) {
        if (candidateIdentifier === identifier) {
            return PAGES[index];
        }
    }
    // If identifier is not found, it means identifier is invalid, return not found
    return NOT_FOUND_PAGE;
}

import SignInPage from "./SignIn";
import HomePage from "./Home";
import FacultyProfilesPage from "./FacultyProfiles";


export const SIGN_IN_PAGE = {
    identifier: "SIGN_IN_PAGE",
    route: "/sign-in",
    component: SignInPage,
};

export const FACULTY_PROFILES_PAGE = {
    identifier: "FACULTY_PROFILES_PAGE",
    route: "/faculty-profiles",
    component: FacultyProfilesPage,
    name: "Faculty Profiles",
};

export const HOME_PAGE = {
    identifier: "HOME_PAGE",
    route: "/home",
    component: HomePage,
    name: "Home",
};

export const FACULTY_LOADING_PAGE = {
    identifier: "FACULTY_LOADING_PAGE",
    route: "/faculty-loading",
    name: "Faculty Loading",
};

export const TRACER_STUDY_PAGE = {
    identifier: "TRACER_STUDY_PAGE",
    route: "/tracer-study",
    name: "Tracer Study",
};

export const USER_SETTINGS_PAGE = {
    identifier: "USER_SETTINGS_PAGE",
    route: "/users",
    name: "Users",
};

export const NOT_FOUND_PAGE = {
    identifier: "NOT_FOUND_PAGE",
    route: "/404",
};

export const PAGES = [
    SIGN_IN_PAGE,
    FACULTY_PROFILES_PAGE,
    HOME_PAGE,
    FACULTY_LOADING_PAGE,
    TRACER_STUDY_PAGE,
    USER_SETTINGS_PAGE,
    NOT_FOUND_PAGE,
];

export function getPageFromRoute(candidateRoute) {
    for (const [index, {route}] of PAGES.entries()) {
        if (candidateRoute === route) {
            return PAGES[index];
        }
    }

    // If route is not found, it means route is invalid, return not found
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

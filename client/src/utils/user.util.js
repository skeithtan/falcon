import { ASSOCIATE_DEAN, CLERK, DEAN, FACULTY, USER_TYPES } from "../enums/user.enums";
import { FACULTY_LOADING_PAGE, FACULTY_PROFILES_PAGE, MY_PROFILE, SUBJECTS_PAGE, USER_SETTINGS_PAGE } from "../pages";


export const getFullName = user => {
    const name = user.name;
    return `${name.first} ${name.last}`;
};

export const getInitials = user => {
    const name = user.name;
    return name.first[0] + name.last[0];
};

export const getObjectForUserType = (user, objectForUser) => {
    if (!Object.keys(objectForUser).includes(user.authorization)) {
        throw new Error(`Error: Tried to get object for unsupported user type ${user.authorization} on object ${objectForUser}`);
    }

    return objectForUser[user.authorization];
};

const PERMISSIONS_PER_USER = {
    MUTATE_FACULTY_PROFILES: [CLERK],
    VIEW_FACULTY_PROFILES: [ASSOCIATE_DEAN, DEAN, CLERK],
    REQUEST_PROFILE_CHANGE: [FACULTY],
    REVIEW_PROFILE_CHANGE_REQUEST: [CLERK],
    VIEW_SUBJECTS_PAGE: [ASSOCIATE_DEAN, DEAN, CLERK],
};

export const getPermissions = user => {
    const permissions = {...PERMISSIONS_PER_USER};
    const userAuthorization = USER_TYPES[user.authorization];

    for (const [action, authorizedPersonnel] of Object.entries(permissions)) {
        permissions[action] = authorizedPersonnel.includes(userAuthorization);
    }

    return permissions;
};

export const generateTemporaryPassword = () => Math.random().toString(36).substring(7);

export const getPagesForUser = user => {
    const administrativePages = [
        FACULTY_PROFILES_PAGE,
        FACULTY_LOADING_PAGE,
        SUBJECTS_PAGE,
        USER_SETTINGS_PAGE,
    ];

    const facultyPages = [
        MY_PROFILE,
    ];

    return getObjectForUserType(user, {
        DEAN: administrativePages,
        ASSOCIATE_DEAN: administrativePages,
        CLERK: administrativePages,
        FACULTY: facultyPages,
    });
};

export const getDefaultPageForUser = user => getObjectForUserType(user, {
    DEAN: FACULTY_LOADING_PAGE,
    ASSOCIATE_DEAN: FACULTY_LOADING_PAGE,
    CLERK: FACULTY_PROFILES_PAGE,
    FACULTY: MY_PROFILE, // TODO: Replace with MySchedule
});


import { ASSOCIATE_DEAN, CLERK, DEAN, FACULTY, USER_TYPES } from "../enums/user.enums";


export const getFullName = user => {
    const name = user.name;
    return `${name.first} ${name.last}`;
};

export const getInitials = user => {
    const name = user.name;
    return name.first[0] + name.last[0];
};

export const getObjectForUserType = ({user, ifAdministrative, ifFaculty}) => {
    switch (user.authorization) {
        case DEAN.identifier:
        case ASSOCIATE_DEAN.identifier:
        case CLERK.identifier:
            return ifAdministrative;

        case FACULTY.identifier:
            return ifFaculty;

        default:
            throw new Error(`Unknown user authorization type ${user.authorization}`);
    }
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

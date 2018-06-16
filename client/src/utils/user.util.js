import { ASSOCIATE_DEAN, CLERK, DEAN, USER_TYPES } from "../enums/user.enums";


export const getFullName = user => {
    const name = user.name;
    return `${name.first} ${name.last}`;
};

export const getInitials = user => {
    const name = user.name;
    return name.first[0] + name.last[0];
};

const PERMISSIONS_PER_USER = {
    MUTATE_FACULTY_PROFILES: [CLERK],
    VIEW_FACULTY_PROFILES: [ASSOCIATE_DEAN, DEAN, CLERK],
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

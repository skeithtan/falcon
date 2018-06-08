import { ASSOCIATE_DEAN, CLERK, DEAN, FACULTY } from "../enums/user.enums";


export function getFullName(user) {
    const name = user.name;
    return `${name.first} ${name.last}`;
}

export function getInitials(user) {
    const name = user.name;
    return name.first[0] + name.last[0];
}

export function getObjectForUserType({user, ifAdministrative, ifFaculty}) {
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
}
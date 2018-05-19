export function getFullName(user) {
    const name = user.name;
    return `${name.first} ${name.last}`;
}

export function getInitials(user) {
    const name = user.name;
    return name.first[0] + name.last[0];
}
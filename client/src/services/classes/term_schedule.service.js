import gql from "graphql-tag";
import { client } from "../../client";
import { fields as classScheduleFields } from "./classes.service";
import { fields as facultyResponseFields } from "./faculties.service";

const termScheduleFields = `
    _id
    startYear
    term
    status
    facultyPool {
        ${facultyResponseFields}
    }
    classes {
        ${classScheduleFields}
    }
`;

export const fetchAllTermSchedules = () =>
    client.query({
        query: gql`
        query {
            termSchedules {
                current {
                    ${termScheduleFields}
                }

                archived {
                    ${termScheduleFields}
                }
            }
        }
    `,
    });

export const addTermSchedule = (startYear, term) =>
    client.mutate({
        mutation: gql`
            mutation($startYear: Int!, $term: Term!) {
                addTermSchedule(startYear: $startYear, term: $term) {
                    ${termScheduleFields}
                }
            }
        `,
        variables: {
            startYear,
            term,
        },
    });

export const addFacultiesToPool = (termScheduleId, faculties) =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!, $faculties: [ID!]!) {
                termSchedule(_id: $termScheduleId) {
                    addFacultiesToPool(faculties: $faculties) {
                        ${facultyResponseFields}
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
            faculties,
        },
    });

export const addClassToTerm = (termScheduleId, newClass) =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!, $newClass: ClassInput!) {
                termSchedule(_id: $termScheduleId) {
                    classes {
                        add(newClass: $newClass) {
                            ${classScheduleFields}
                        }
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
            newClass,
        },
    });

export const removeClassFromTerm = (termScheduleId, classId) =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!, $classId: ID!) {
                termSchedule(_id: $termScheduleId) {
                    classes {
                        remove(_id: $classId)
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
            classId,
        },
    });

export const advanceTermScheduleStatus = termScheduleId =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!) {
                termSchedule(_id: $termScheduleId) {
                    status {
                        advance
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
        },
    });

export const returnTermScheduleStatus = termScheduleId =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!) {
                termSchedule(_id: $termScheduleId) {
                    status {
                        return
                    }
                }
            }
        `,
        variables: {
            termScheduleId,
        },
    });

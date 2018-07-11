import { client } from "../../client";
import gql from "../../../node_modules/graphql-tag";

const facultyResponseFields = `
    faculty
    availability
    feedback {
        status
        rejectionReason
    }
`;

const classFields = `
    _id
    subject
    meetingDays
    meetingHours
    room
    enrollmentCap
    faculty
    course
    section
`;

const termScheduleFields = `
    _id
    startYear
    term
    status
    facultyPool {
        ${facultyResponseFields}
    }
    classes {
        ${classFields}
    }
`;

export const fetchAllTermSchedules = () =>
    client.query({
        query: gql`
        query {
            termSchedules {
                ${termScheduleFields}
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

export const setFacultyAvailability = (availability, termScheduleId) =>
    client.mutate({
        mutation: gql`
            mutation($availability: JSON!, $termScheduleId: ID!) {
                setFacultyAvailability(
                    availaibility: $availability
                    termScheduleId: $termScheduleId
                )
            }
        `,
        variables: {
            availability,
            termScheduleId,
        },
    });

export const setFacultyPool = (termScheduleId, faculties) =>
    client.mutate({
        mutation: gql`
            mutation($termScheduleId: ID!, $faculties: [ID!]!) {
                termSchedule(_id: $termScheduleId) {
                    setFacultyPool(faculties: $faculties) {
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
                            ${classFields}
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

import gql from "graphql-tag";
import client from "../client";


export function fetchAllFacultiesSummary() {
    return client.query({
        query: gql`
            query {
                faculties {
                    _id
                    user {
                        name {
                            first
                            last
                        }

                        email
                        photo
                    }
                }
            }
        `,
    });
}

export function fetchFacultyDetails(facultyId) {
    return client.query({
        query: gql`
            query($id: String!) {
                faculty(_id: $id) {
                    sex
                    employment
                    birthDate

                    degrees {
                        _id
                        title
                        level
                        completionYear
                    }

                    recognitions {
                        _id
                        title
                        basis
                        sponsor
                        date {
                            month
                            year
                        }
                    }

                    teachingSubjects {
                        _id
                        code
                        name
                        major
                    }

                    presentations {
                        _id
                        title
                        category
                        sponsor
                        venue
                        conference
                        medium
                        daysDuration
                        date {
                            month
                            year
                        }
                    }

                    instructionalMaterials {
                        _id
                        title
                        medium
                        classification
                        usageYear
                        level
                        nonPrintType
                    }

                    extensionWorks {
                        _id
                        title
                        roles
                        venue
                    }
                }
            }
        `,
        variables: {
            id: facultyId,
        },
    });
}

export function addFaculty(newFaculty, newUser, temporaryPassword) {
    return client.mutate({
        mutation: gql`
            mutation createFaculty($newFaculty: FacultyInput!, $newUser: UserInput!, $temporaryPassword: String!) {
                faculty {
                    createFaculty(newFaculty: $newFaculty, newUser: $newUser, temporaryPassword: $temporaryPassword) {
                        _id
                        user {
                            name {
                                first
                                last
                            }

                            email
                            photo
                        }
                    }
                }
            }
        `,
        variables: {
            newFaculty,
            newUser,
            temporaryPassword,
        },
    });
}
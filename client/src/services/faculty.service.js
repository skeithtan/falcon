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

export function fetchFacultyOverview(facultyId) {
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
                }
            }
        `,
        variables: {
            id: facultyId,
        },
    });
}
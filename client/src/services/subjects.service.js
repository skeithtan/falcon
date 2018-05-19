import gql from "graphql-tag";
import client from "../client";


export function fetchAllSubjects() {
    return client.query({
        query: gql`
            query {
                subjects {
                    code
                    name
                    faculties {
                        _id
                    }
                }
            }
        `
    })
}
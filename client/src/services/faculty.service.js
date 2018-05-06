import gql from "graphql-tag";
import client from "../graphql/client";

export function getAllFacultiesOverview() {
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
                    }
                    sex
                    employment
                    birthDate
                }
            }
        `,
    });
}
import gql from "graphql-tag";
import { client } from "../../../client";


export function reviewDegreeChange({facultyId, _id, action}) {
    return client.mutate({
        mutation: gql`
            mutation reviewDegreeChange($facultyId: ID!, $_id: ID!) {
                reviewProfileChanges(facultyId: $facultyId) {
                    degrees(_id: $_id) {
                        ${action.name}
                    }
                }
            }
        `
    })
}
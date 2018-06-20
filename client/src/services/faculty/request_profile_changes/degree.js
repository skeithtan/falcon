import gql from "graphql-tag";
import { client } from "../../../client";
import { getChangeRequestFields } from "../../../utils/change_request.util";
import { fields as degreeFields } from "../degree";


const degreeChangeFields = getChangeRequestFields(degreeFields);

export const addDegree = newDegree => client.mutate({
    mutation: gql`
        mutation addDegree($newDegree: DegreeInput!) {
            requestProfileChanges {
                degrees {
                    add(newDegree: $newDegree) {
                        ${degreeChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        newDegree,
    },
});

export const updateDegree = (_id, newDegree) => client.mutate({
    mutation: gql`
        mutation updateDegree($_id: ID!, $newDegree: DegreeInput!) {
            requestProfileChanges {
                degrees {
                    update(_id: $_id, newDegree: $newDegree) {
                        ${degreeChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
        newDegree,
    },
});

export const removeDegree = _id => client.mutate({
    mutation: gql`
        mutation removeDegree($_id: ID!) {
            requestProfileChanges {
                degrees {
                    remove(_id: $_id) {
                        ${degreeChangeFields}
                    }
                }
            }
        }
    `,
    variables: {
        _id,
    },
});
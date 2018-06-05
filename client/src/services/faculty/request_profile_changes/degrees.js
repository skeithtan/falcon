import gql from "graphql-tag";
import { client } from "../../../client";


const degreeChangeFields = `
    _id
    submitted
    action
    changeObjectId
    object
`;

export function addDegree(newDegree) {
    return client.mutate({
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
}

export function updateDegree(_id, newDegree) {
    return client.mutate({
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
}

export function removeDegree(_id) {
    return client.mutate({
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
}
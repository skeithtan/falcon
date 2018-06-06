import gql from "graphql-tag";
import { client } from "../../../client";


export const reviewOverviewChange = ({facultyId, action}) => client.mutate({
    mutation: gql`
        mutation reviewOverviewChange($facultyId: ID!) {
            reviewProfileChanges(facultyId: $facultyId) {
                overview {
                    ${action.name}
                }
            }
        }
    `,
    variables: {
        facultyId,
        action,
    },
});
import gql from "graphql-tag";
import { client } from "../../../client";


export function reviewOverviewChange({facultyId, action}) {
    return client.mutate({
        mutation: gql`
            mutation reviewOverviewChange($facultyId: ID!) {
                reviewProfileChanges(facultyId: $facultyId) {
                    overview {
                        ${action.name}
                    }
                }
            }
        `,
    });
}
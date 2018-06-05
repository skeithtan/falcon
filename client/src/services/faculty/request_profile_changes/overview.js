import { client } from "../../../client";
import gql from "graphql-tag";

const overviewChangeFields = `
    submitted
    sex
    employment
    birthDate
    name {
        first
        last
    }
`;

export function updateOverview(newOverview) {
    return client.mutate({
        mutation: gql`
            mutation {
                requestProfileChanges {
                    overview {
                        update(newOverview: $newOverview) {
                            ${overviewChangeFields}
                        }
                    }
                }
            }
        `,
        variables: {
            newOverview,
        },
    });
};
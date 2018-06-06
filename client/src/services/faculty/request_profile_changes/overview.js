import gql from "graphql-tag";
import { client } from "../../../client";


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

export const updateOverview = newOverview => client.mutate({
    mutation: gql`
        mutation updateOverview($newOverview: OverviewChangeInput!){
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
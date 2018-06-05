import gql from "graphql-tag";
import { client } from "../../../client";


export function addDegree(newDegree) {
    return client.mutate({
        mutation: gql`

        `,
    });
}
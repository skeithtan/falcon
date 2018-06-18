import gql from "graphql-tag";
import { client } from "../client";


export function signIn(email, password) {
    return client.mutate({
        mutation: gql`
            mutation ($email: String!, $password: String!) {
                signIn(email:$email, password:$password) {
                    token
                    email
                    photo
                    authorization
                    temporaryPassword
                    name {
                        first
                        last
                    }
                }
            }
        `,
        variables: {
            email: email,
            password: password,
        },
    }).then(result => {
        const {token, ...user} = result.data.signIn;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        return result.data.signIn;
    });
}

export const changeCurrentUserPassword = newPassword => client.mutate({
    mutation: gql`
        mutation($newPassword: String!) {
            changeCurrentUserPassword(newPassword: $newPassword)
        }
    `,
    variables: {
        newPassword,
    },
});

export function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
import client from "../graphql/client";
import gql from "graphql-tag";


const userService = {
    signIn(email, password) {
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
            localStorage.token = result.data.signIn.token;
            return result.data.signIn;
        });
    },

    signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};

export default userService;
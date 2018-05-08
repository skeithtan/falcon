import client from "../client";
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
            const {token, ...user} = result.data.signIn;
            localStorage.token = token;
            localStorage.user = JSON.stringify(user);
            return result.data.signIn;
        });
    },

    signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};

export default userService;
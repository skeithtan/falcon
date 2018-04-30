import jwtDecode from "jwt-decode";
import client from "../graphql/client";
import gql from "graphql-tag";


const userService = {
    signIn(email, password) {
        return client.mutate({
            mutation: gql`
                mutation ($email: String!, $password: String!) {
                    signIn(email:$email, password:$password)
                }
            `,
            variables: {
                email: email,
                password: password,
            },
        }).then(result => {
            const token = result.data.signIn;
            const user = jwtDecode(token);
            localStorage.token = token;

            return user;
        });
    },

    signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};

export default userService;
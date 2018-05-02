import { connect } from "react-redux";
import { withTheme } from "material-ui/styles";

import SignInPage from "./SignIn";
import userService from "../../services/user.service";
import {
    attemptSignIn,
    setCurrentUser,
    setSignInError,
} from "../../actions/authentication.actions";

function getMessageFromError(error) {
    if (error.networkError) {
        return "A network error has occurred";
    }

    if (error.graphQLErrors) {
        return error.graphQLErrors[0].message;
    }

    return "An unknown error occurred";
}


function mapStateToProps(state) {
    return state.authentication;
}

function mapDispatchToProps(dispatch) {
    return {
        attemptSignIn(email, password) {
            dispatch(attemptSignIn());

            userService.signIn(email, password)
                       .then(user => {
                           dispatch(setCurrentUser(user));
                       })
                       .catch(error => {
                           const errorMessage = getMessageFromError(error);
                           dispatch(setSignInError(errorMessage));
                       });
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(SignInPage));
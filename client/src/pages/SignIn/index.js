import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";


import styles from "./styles";
import SignInPage from "./SignIn";
import userService from "../../services/user.service";
import {
    signInIsLoading,
    signInSuccess,
    signInError,
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
            dispatch(signInIsLoading());

            userService.signIn(email, password)
                       .then(user => {
                           dispatch(signInSuccess(user));
                           //TODO: If password is temporary, show tour
                       })
                       .catch(error => {
                           const errorMessage = getMessageFromError(error);
                           dispatch(signInError(errorMessage));
                       });
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(SignInPage);


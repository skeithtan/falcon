import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { signInError, signInIsLoading, signInSuccess } from "../../redux/actions/authentication.actions";
import { signIn } from "../../services/user.service";
import { SignInPage as Component } from "./SignIn";
import { styles } from "./styles";


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
            signIn(email, password)
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

export const SignInPage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);


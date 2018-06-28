import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { signInError, signInIsLoading, signInSuccess } from "../../redux/actions/authentication.actions";
import { signIn } from "../../services/user.service";
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

const mapStateToProps = state => state.authentication;

const mapDispatchToProps = dispatch => ({
    attemptSignIn(email, password) {
        dispatch(signInIsLoading());
        signIn(email, password)
            .then(user => dispatch(signInSuccess(user)))
            .catch(error => {
                const errorMessage = getMessageFromError(error);
                dispatch(signInError(errorMessage));
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);


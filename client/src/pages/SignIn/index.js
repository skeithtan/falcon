import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/user.actions";
import SignInPage from "./SignIn";


function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSignInSuccess(user) {
            dispatch(setCurrentUser(user));
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
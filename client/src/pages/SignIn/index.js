import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/user.actions";
import SignInPage from "./SignIn";


function mapDispatchToProps(dispatch) {
    return {
        onSignInSuccess(user) {
            dispatch(setCurrentUser(user));
        },
    };
}


export default connect(null, mapDispatchToProps)(SignInPage);
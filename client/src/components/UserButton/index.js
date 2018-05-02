import { connect } from "react-redux";
import { withTheme } from "material-ui/styles";

import userService from "../../services/user.service";
import { setCurrentUser } from "../../actions/authentication.actions";
import UserButton from "./UserButton";

function mapStateToProps(state) {
    return state.authentication;
}

function mapDispatchToProps(dispatch) {
    return {
        signOut() {
            userService.signOut();
            dispatch(setCurrentUser(null));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(UserButton));

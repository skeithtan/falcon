import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import userService from "../../services/user.service";
import { setCurrentUser } from "../../actions/authentication.actions";
import UserButton from "./UserButton";
import styles from "./styles";

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

export default compose(
    withTheme(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(UserButton);

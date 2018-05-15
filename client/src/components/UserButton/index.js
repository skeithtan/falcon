import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { signOutSuccess } from "../../actions/authentication.actions";
import userService from "../../services/user.service";
import styles from "./styles";
import UserButton from "./UserButton";


function mapStateToProps(state) {
    return state.authentication;
}

function mapDispatchToProps(dispatch) {
    return {
        signOut() {
            userService.signOut();
            dispatch(signOutSuccess());
        },
    };
}

export default compose(
    withTheme(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(UserButton);

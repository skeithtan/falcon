import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { signOutSuccess } from "../../actions/authentication.actions";
import { signOut } from "../../services/user.service";
import { styles } from "./styles";
import { UserButton as Component } from "./UserButton";


function mapStateToProps(state) {
    return state.authentication;
}

function mapDispatchToProps(dispatch) {
    return {
        signOut() {
            signOut();
            dispatch(signOutSuccess());
        },
    };
}

export const UserButton = compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Component);

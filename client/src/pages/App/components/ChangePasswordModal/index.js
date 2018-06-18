import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../components/styles";
import { toastIsShowing } from "../../../../redux/actions/toast.actions";
import { ChangePasswordModal as Component } from "./ChangePasswordModal";


const mapDispatchToProps = dispatch => ({
    makeToast(message) {
        dispatch(toastIsShowing(message));
    },
});

export const ChangePasswordModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);
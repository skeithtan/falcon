import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { toastIsDismissed } from "../../../../redux/actions/toast.actions";
import { styles } from "./styles";
import { Toast as Component } from "./Toast";


const mapStateToProps = state => ({
    ...state.toast,
});

const mapDispatchToProps = dispatch => ({
    dismissToast() {
        dispatch(toastIsDismissed());
    },
});
export const Toast = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
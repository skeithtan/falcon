import compose from "recompose/compose";
import { connect } from "react-redux";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";


const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },
})

export const wrap = compose(connect(null, mapDispatchToProps));
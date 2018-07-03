import { connect } from "react-redux";
import compose from "recompose/compose";
import { changeRequestIsDismissed } from "../../../../../redux/actions/change_requests.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { rescindChangeRequest } from "../../../../../services/faculty/request_profile_changes";


const mapDispatchToProps = dispatch => ({
    onRescindChangeRequest(changeRequest, faculty) {
        return rescindChangeRequest(changeRequest._id)
            .then(() => dispatch(toastIsShowing("Change request successfully rescinded")))
            .then(() => dispatch(changeRequestIsDismissed(changeRequest, faculty._id)));
    },
});

export const wrap = compose(
    connect(null, mapDispatchToProps),
);
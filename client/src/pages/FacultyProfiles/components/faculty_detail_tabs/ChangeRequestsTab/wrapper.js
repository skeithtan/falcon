import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { SUBDOCUMENT_TYPE } from "../../../../../enums/faculty.enums";
import { changeRequestIsDismissed } from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import {
    approveChangeRequest,
    fetchMyChangeRequests,
    rejectChangeRequest,
} from "../../../../../services/faculty/change_requests";
import { fetchChangeRequests } from "../../../../../utils/change_request.util";
import { styles } from "../styles";


const mapStateToProps = state => ({
    ...state.changeRequests,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchChangeRequests() {
        return fetchChangeRequests(dispatch);
    },

    fetchMyChangeRequests() {
        return fetchMyChangeRequests(dispatch);
    },

    onApproveChangeRequest(changeRequest, faculty) {
        return approveChangeRequest(changeRequest._id)
            .then(result => result.data.reviewProfileChangeRequest.approve)
            .then(newSubdocument => {
                dispatch(changeRequestIsDismissed(changeRequest));

                console.log("New subdocument", newSubdocument);

                const newFaculty = {
                    ...faculty,
                };

                const facultyKey = SUBDOCUMENT_TYPE[changeRequest.subdocumentType].facultyKey;
                console.log("Faculty key", facultyKey, changeRequest);

                newFaculty[facultyKey] = [...newFaculty[facultyKey], newSubdocument];
                dispatch(facultyIsUpdated(newFaculty));

                dispatch(toastIsShowing("Change request successfully approved"));
                return newSubdocument;
            });
    },

    onRejectChangeRequest(changeRequest) {
        return rejectChangeRequest(changeRequest._id)
            .then(() => {
                dispatch(changeRequestIsDismissed(changeRequest));
                dispatch(toastIsShowing("Change request successfully rejected"));
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { SUBDOCUMENT_TYPE } from "../../../../../enums/faculty.enums";
import { CHANGE_REQUEST_STATUSES } from "../../../../../enums/review_profile_change.enums";
import { changeRequestIsUpdated } from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { approveChangeRequest, rejectChangeRequest } from "../../../../../services/faculty/change_requests";
import { initiateFetchChangeRequests, initiateFetchMyChangeRequests } from "../../../../../utils/change_request.util";
import { styles } from "../styles";


const mapStateToProps = state => ({
    changeRequests: state.changeRequests,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchChangeRequests() {
        return initiateFetchChangeRequests(dispatch);
    },

    fetchMyChangeRequests() {
        return initiateFetchMyChangeRequests(dispatch);
    },

    onApproveChangeRequest(changeRequest, faculty) {
        const newChangeRequest = {
            ...changeRequest,
            status: CHANGE_REQUEST_STATUSES.APPROVED.identifier,
        };

        return approveChangeRequest(changeRequest._id)
            .then(result => result.data.reviewProfileChangeRequest.approve)
            .then(newSubdocument => {
                dispatch(changeRequestIsUpdated(newChangeRequest, faculty._id));

                const newFaculty = {
                    ...faculty,
                };

                const facultyKey = SUBDOCUMENT_TYPE[changeRequest.subdocumentType].facultyKey;

                newFaculty[facultyKey] = [...newFaculty[facultyKey], newSubdocument];
                dispatch(facultyIsUpdated(newFaculty));

                dispatch(toastIsShowing("Change request successfully approved"));
                return newSubdocument;
            });
    },

    onRejectChangeRequest(changeRequest, rejectionReason, faculty) {
        const newChangeRequest = {
            ...changeRequest,
            status: CHANGE_REQUEST_STATUSES.REJECTED.identifier,
            rejectionReason: rejectionReason,
        };

        return rejectChangeRequest(changeRequest._id, rejectionReason)
            .then(() => {
                dispatch(changeRequestIsUpdated(newChangeRequest, faculty._id));
                dispatch(toastIsShowing("Change request successfully rejected"));
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);
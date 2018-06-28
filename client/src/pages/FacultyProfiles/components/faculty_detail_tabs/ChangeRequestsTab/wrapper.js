import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { SUBDOCUMENT_TYPE } from "../../../../../enums/faculty.enums";
import {
    changeRequestFetchError,
    changeRequestIsDismissed,
    changeRequestIsFetched,
    changeRequestsIsLoading,
} from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import {
    approveChangeRequest,
    fetchAllChangeRequests,
    fetchMyChangeRequests,
    rejectChangeRequest,
} from "../../../../../services/faculty/change_requests";
import { styles } from "../styles";


const mapStateToProps = state => ({
    ...state.changeRequests,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    getChangeRequests() {
        dispatch(changeRequestsIsLoading());
        return fetchAllChangeRequests()
            .then(result => result.data.profileChangeRequests)
            .then(changeRequests => dispatch(changeRequestIsFetched(changeRequests)))
            .catch(error => {
                console.log("An error occurred while fetching change requests", error);
                dispatch(changeRequestFetchError([error.message]));
            });
    },

    getMyChangeRequests() {
        dispatch(changeRequestsIsLoading());
        return fetchMyChangeRequests()
            .then(result => result.data.myChangeRequests)
            .then(changeRequests => dispatch(changeRequestIsFetched(changeRequests)))
            .catch(error => {
                console.log("An error occurred while fetching my change requests", error);
                dispatch(changeRequestFetchError([error.message]));
            });
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
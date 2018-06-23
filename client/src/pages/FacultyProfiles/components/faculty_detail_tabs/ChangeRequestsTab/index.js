import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
    changeRequestFetchError,
    changeRequestIsDismissed,
    changeRequestIsFetched,
    changeRequestsIsLoading,
} from "../../../../../redux/actions/change_requests.actions";
import { fetchAllChangeRequests, fetchMyChangeRequests } from "../../../../../services/faculty/change_requests";
import { styles } from "../styles";
import { ChangeRequestsTab as Component } from "./ChangeRequestsTab";


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

    dismissChangeRequest(changeRequest) {
        dispatch(changeRequestIsDismissed(changeRequest));
    },
});

export const ChangeRequestsTab = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
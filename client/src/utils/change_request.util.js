import {
    changeRequestFetchError,
    changeRequestIsFetched,
    changeRequestsIsLoading,
} from "../redux/actions/change_requests.actions";
import { fetchAllPendingChangeRequests, fetchMyChangeRequests } from "../services/faculty/change_requests";


export const getChangeRequestFields = objectFields => `
        submitted
        faculty
        subdocumentType
        rejectionReason
        status
        ${objectFields}
`;

export const normalizeChangeRequests = changeRequests => {
    let normalized = {};

    changeRequests.forEach(({faculty, ...changeRequest}) => {
        if (normalized[faculty]) {
            normalized[faculty].push(changeRequest);
        } else {
            normalized[faculty] = [changeRequest];
        }
    });

    return normalized;
};

export const initiateFetchChangeRequests = dispatch => {
    dispatch(changeRequestsIsLoading());
    return fetchAllPendingChangeRequests()
        .then(result => result.data.profileChangeRequests)
        .then(changeRequests => dispatch(changeRequestIsFetched(changeRequests)))
        .catch(error => {
            console.log("An error occurred while fetching change requests", error);
            dispatch(changeRequestFetchError([error.message]));
        });
};

export const initiateFetchMyChangeRequests = dispatch => {
    dispatch(changeRequestsIsLoading());
    return fetchMyChangeRequests()
        .then(result => result.data.myChangeRequests)
        .then(changeRequests => dispatch(changeRequestIsFetched(changeRequests)))
        .catch(error => {
            console.log("An error occurred while fetching my change requests", error);
            dispatch(changeRequestFetchError([error.message]));
        });
};
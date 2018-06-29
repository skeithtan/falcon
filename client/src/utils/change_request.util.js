import {
    changeRequestFetchError,
    changeRequestIsFetched,
    changeRequestsIsLoading,
} from "../redux/actions/change_requests.actions";
import { fetchAllChangeRequests } from "../services/faculty/change_requests";


export const getChangeRequestFields = objectFields => `
        submitted
        faculty
        subdocumentType
        ${objectFields}
`;

export const changeRequestsForFaculty = (changeRequests, facultyId) =>
    changeRequests.filter(changeRequest => changeRequest.faculty === facultyId);

export const fetchChangeRequests = dispatch => {
    dispatch(changeRequestsIsLoading());
    return fetchAllChangeRequests()
        .then(result => result.data.profileChangeRequests)
        .then(changeRequests => dispatch(changeRequestIsFetched(changeRequests)))
        .catch(error => {
            console.log("An error occurred while fetching change requests", error);
            dispatch(changeRequestFetchError([error.message]));
        });
};

export const fetchMyChangeRequests = dispatch => {
    dispatch(changeRequestsIsLoading());
    return fetchMyChangeRequests()
        .then(result => result.data.myChangeRequests)
        .then(changeRequests => dispatch(changeRequestIsFetched(changeRequests)))
        .catch(error => {
            console.log("An error occurred while fetching my change requests", error);
            dispatch(changeRequestFetchError([error.message]));
        });
};
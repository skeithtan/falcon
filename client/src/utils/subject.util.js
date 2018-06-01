import { subjectListFetchError, subjectListIsFetched, subjectListIsLoading } from "../redux/actions/subject.actions";
import { fetchAllSubjects } from "../services/subjects.service";


export const getFetchSubjectListThunk = () => dispatch => {
    dispatch(subjectListIsLoading());
    fetchAllSubjects()
        .then(result => {
            if (result.data) {
                dispatch(subjectListIsFetched(result.data.subjects));
            }
            if (result.errors) {
                dispatch(subjectListFetchError(result.errors));
            }
        })
        .catch(error => {
            dispatch(subjectListFetchError([error.message]));
        });
};
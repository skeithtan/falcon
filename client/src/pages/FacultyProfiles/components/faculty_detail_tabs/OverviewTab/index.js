import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";
import { overviewFetched, overviewFetchError, overviewIsLoading } from "../../../../../actions/faculty_profiles.actions";
import { fetchFacultyOverview } from "../../../../../services/faculty.service";
import { updateFacultyFromState } from "../../../../../utils/faculty";

import OverviewTab from "./OverviewTab";
import styles from "./styles";

function getFacultyOverviewThunk(faculty) {

    return function (dispatch, getState) {

        function dispatchIfActive(action) {
            const activeFacultyId = getState().facultyProfiles.activeFacultyId;

            // Is the active faculty still the same faculty we fetched for?
            if (activeFacultyId === faculty._id) {

                // If so, dispatch update
                dispatch(action);
            }
        }

        return fetchFacultyOverview(faculty._id)
            .then(result => {
                const overview = result.data.faculty;
                const newFaculty = Object.assign({}, faculty, overview);

                // Update faculty list with this new overview
                updateFacultyFromState(newFaculty, dispatch, getState);

                // Tell overview to update with these details
                dispatchIfActive(overviewFetched(faculty));
            })
            .catch(error => {
                // Tell overview we had problems fetching
                dispatchIfActive(overviewFetchError([error.message]));
            });
    };
}


function mapStateToProps(state) {
    return {
        ...state.facultyProfiles.overviewTab,
        get activeFaculty() {
            const activeFacultyId = state.facultyProfiles.activeFacultyId;
            return state.facultyProfiles.faculties.find(faculty => faculty._id === activeFacultyId);
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getFacultyOverview(faculty) {
            dispatch(overviewIsLoading());
            dispatch(getFacultyOverviewThunk(faculty));
        },
        setOverviewFetched() {
            dispatch(overviewFetched());
        },
    };

}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(OverviewTab);
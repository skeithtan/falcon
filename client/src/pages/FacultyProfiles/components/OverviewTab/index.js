import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";
import { overviewFetched, overviewFetchError, overviewIsLoading } from "../../../../actions/faculty_detail.actions";
import { fetchFacultyOverview } from "../../../../services/faculty.service";
import { updateFacultyFromState } from "../../../../utils/faculty";

import OverviewTab from "./OverviewTab";
import styles from "./styles";

function getFacultyOverviewThunk(faculty) {
    return function (dispatch, getState) {
        return fetchFacultyOverview(faculty._id)
            .then(result => {
                const overview = result.data.faculty;
                const newFaculty = Object.assign({}, faculty, overview);

                // Update faculty list with this new overview
                updateFacultyFromState(newFaculty, dispatch, getState);

                const activeFacultyId = getState().facultyList.activeFacultyId;

                // Is the active faculty still the same faculty we fetched for?
                if (activeFacultyId !== faculty._id) {

                    // If so, tell overview to update with these details
                    dispatch(overviewFetched(faculty));
                }
            })
            .catch(errors => {
                const activeFacultyId = getState().facultyList.activeFacultyId;

                // Is the active faculty still the same faculty we fetched for?
                if (activeFacultyId !== faculty._id) {

                    // If so, tell overview we had problems fetching
                    dispatch(overviewFetchError(errors));
                }
            });
    };
}


function mapStateToProps(state) {
    return {
        ...state.facultyDetail.overviewTab,
        get activeFaculty() {
            const activeFacultyId = state.facultyList.activeFacultyId;
            return state.facultyList.faculties.find(faculty => faculty._id === activeFacultyId);
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
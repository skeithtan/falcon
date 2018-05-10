import { withStyles, withTheme } from "material-ui/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
    activeTabChanged,
    detailFetched,
    detailFetchError,
    detailsIsLoading,
} from "../../../../actions/faculty_profiles.actions";
import { fetchFacultyDetails } from "../../../../services/faculty.service";
import { updateFacultyFromState } from "../../../../utils/faculty";
import { getTabFromIdentifier } from "../faculty_detail_tabs";
import FacultyDetail from "./FacultyDetail";
import styles from "./styles";


function getFacultyDetailsThunk(faculty) {
    return function (dispatch, getState) {
        function dispatchIfActive(action) {
            const activeFacultyId = getState().facultyProfiles.activeFacultyId;
            // Is the active faculty still the same faculty we fetched for?
            if (activeFacultyId === faculty._id) {

                // If so, dispatch update
                dispatch(action);
            }
        }

        return fetchFacultyDetails(faculty._id)
            .then(result => {
                const overview = result.data.faculty;
                const newFaculty = Object.assign({}, faculty, overview);
                // Update faculty list with this new overview
                updateFacultyFromState(newFaculty, dispatch, getState);
                // Tell overview to update with these details
                dispatchIfActive(detailFetched(faculty));
            })
            .catch(error => {
                // Tell overview we had problems fetching
                dispatchIfActive(detailFetchError([error.message]));
            });
    };
}

function mapStateToProps(state) {
    return {
        activeTab: getTabFromIdentifier(state.facultyProfiles.activeTabIdentifier),
        ...state.facultyProfiles.facultyDetails,
        get activeFaculty() {
            if (!state.facultyProfiles.faculties) {
                return null;
            }
            return state.facultyProfiles.faculties.find(faculty =>
                faculty._id === state.facultyProfiles.activeFacultyId,
            );
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTabChange(tab) {
            dispatch(activeTabChanged(tab));
        },
        getFacultyDetails(faculty) {
            dispatch(detailsIsLoading());
            dispatch(getFacultyDetailsThunk(faculty));
        },
        setDetailsFetched() {
            dispatch(detailFetched());
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(FacultyDetail);

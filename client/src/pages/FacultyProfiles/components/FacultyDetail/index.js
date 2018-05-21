import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
    detailActiveTabChanged,
    detailFetched,
    detailFetchError,
    detailsIsLoading,
} from "../../../../actions/faculty_profiles.actions";
import { fetchFacultyDetails } from "../../../../services/faculty/faculty";
import { updateFacultyFromState } from "../../../../utils/faculty.util";
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
            if (!state.faculty.faculties) {
                return null;
            }
            return state.faculty.faculties.find(faculty =>
                faculty._id === state.facultyProfiles.activeFacultyId,
            );
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTabChange(tab) {
            dispatch(detailActiveTabChanged(tab));
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
    withStyles(styles),
)(FacultyDetail);

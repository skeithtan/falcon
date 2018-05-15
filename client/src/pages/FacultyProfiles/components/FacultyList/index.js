import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
    activeFacultyChanged,
    detailsIsLoading,
    profilesFetched,
    profilesFetchError,
    profilesListIsLoading,
} from "../../../../actions/faculty_profiles.actions";
import { fetchAllFacultiesSummary } from "../../../../services/faculty.service";
import FacultyList from "./FacultyList";
import style from "./styles";


function mapStateToProps(state) {
    return {
        activeFacultyId: state.facultyProfiles.activeFacultyId,
        faculties: state.facultyProfiles.faculties,
        searchKeyword: state.facultyProfiles.searchKeyword,
        ...state.facultyProfiles.facultyList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            dispatch(profilesListIsLoading());
            fetchAllFacultiesSummary()
                .then(query => {
                    if (query.data) {
                        dispatch(profilesFetched(query.data.faculties));
                    }
                    if (query.errors) {
                        dispatch(profilesFetchError(query.errors));
                    }
                })
                .catch(error => {
                    dispatch(profilesFetchError([error.message]));
                });
        },
        onFacultyClick(faculty) {
            dispatch(detailsIsLoading());
            dispatch(activeFacultyChanged(faculty));
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(style),
)(FacultyList);

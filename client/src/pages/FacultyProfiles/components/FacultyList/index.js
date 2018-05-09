import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";
import {
    profilesFetched,
    profilesListIsLoading,
    profilesFetchError,
    activeFacultyChanged,
} from "../../../../actions/faculty_profiles.actions";

import style from "./styles";
import FacultyList from "./FacultyList";
import { fetchAllFacultiesSummary } from "../../../../services/faculty.service";

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
            dispatch(activeFacultyChanged(faculty));
        },
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(style),
)(FacultyList);

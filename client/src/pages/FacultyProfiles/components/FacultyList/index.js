import { compose } from "recompose";
import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { setFaculties, startLoading, setErrors, setActiveFaculty } from "../../../../actions/faculty_profiles.actions";

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
            dispatch(startLoading());

            fetchAllFacultiesSummary()
                .then(query => {
                    if (query.data) {
                        dispatch(setFaculties(query.data.faculties));
                    }

                    if (query.errors) {
                        dispatch(setErrors(query.errors));
                    }
                })
                .catch(error => {
                    dispatch(setErrors([error.message]));
                });
        },

        onFacultyClick(faculty) {
            dispatch(setActiveFaculty(faculty));
        },
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(style),
)(FacultyList);

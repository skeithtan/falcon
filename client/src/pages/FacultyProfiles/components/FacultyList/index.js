import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { activeFacultyChanged, detailsIsLoading } from "../../../../actions/faculty_profiles.actions";
import { getFetchFacultyListThunk } from "../../../../utils/faculty.util";
import { FacultyList as Component } from "./FacultyList";
import { styles } from "./styles";


function mapStateToProps(state) {
    return {
        activeFacultyId: state.facultyProfiles.activeFacultyId,
        searchKeyword: state.facultyProfiles.searchKeyword,
        ...state.faculty,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            dispatch(getFetchFacultyListThunk());
        },
        onFacultyClick(faculty) {
            dispatch(detailsIsLoading());
            dispatch(activeFacultyChanged(faculty));
        },
    };
}

export const FacultyList = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);

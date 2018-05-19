import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { activeFacultyChanged, detailsIsLoading } from "../../../../actions/faculty_profiles.actions";
import { getFetchFacultyListThunk } from "../../../../utils/faculty";
import FacultyList from "./FacultyList";
import style from "./styles";


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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(style),
)(FacultyList);

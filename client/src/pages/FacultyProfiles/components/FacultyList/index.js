import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { detailsIsLoading } from "../../../../redux/actions/faculty_profiles.actions";
import { FacultyList as Component } from "./FacultyList";
import { styles } from "./styles";


const mapStateToProps = state => ({
    activeFacultyId: state.facultyProfiles.activeFacultyId,
    searchKeyword: state.facultyProfiles.searchKeyword,
    ...state.faculty,
});

const mapDispatchToProps = dispatch => ({
    onFacultyClick(faculty) {
        dispatch(detailsIsLoading());
    },
});

export const FacultyList = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);

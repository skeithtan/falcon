import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { detailsIsLoading } from "../../../../redux/actions/faculty_profiles.actions";
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
        onFacultyClick(faculty) {
            dispatch(detailsIsLoading());
        },
    };
}

export const FacultyList = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);

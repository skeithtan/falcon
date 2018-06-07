import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { searchKeywordChanged } from "../../../../redux/actions/faculty_profiles.actions";
import { FacultyProfilesHeader as Component } from "./FacultyProfilesHeader";
import { styles } from "./styles";


const mapStateToProps = state => ({
    searchKeyword: state.facultyProfiles.searchKeyword,
    activeFacultyId: state.facultyProfiles.activeFacultyId,
    activeTabIdentifier: state.facultyProfiles.activeTabIdentifier,
});

const mapDispatchToProps = dispatch => ({
    onSearchInputChange(searchKeyword) {
        dispatch(searchKeywordChanged(searchKeyword));
    },
});

export const FacultyProfilesHeader = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
)(Component);

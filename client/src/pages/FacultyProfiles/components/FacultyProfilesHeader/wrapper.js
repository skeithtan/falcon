import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { searchKeywordChanged } from "../../../../redux/actions/faculty_profiles.actions";
import { styles } from "./styles";


const mapStateToProps = state => ({
    searchKeyword: state.facultyProfiles.searchKeyword,
    activeFacultyId: state.facultyProfiles.activeFacultyId,
    activeTabIdentifier: state.facultyProfiles.activeTabIdentifier,
    changeRequests: state.changeRequests,
});

const mapDispatchToProps = dispatch => ({
    onSearchInputChange(searchKeyword) {
        dispatch(searchKeywordChanged(searchKeyword));
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);

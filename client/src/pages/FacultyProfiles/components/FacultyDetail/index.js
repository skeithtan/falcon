import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";
import { activeTabChanged } from "../../../../actions/faculty_profiles.actions";
import { getTabFromIdentifier } from "../faculty_detail_tabs";

import FacultyDetail from "./FacultyDetail";
import styles from "./styles";

function mapStateToProps(state) {
    return {
        activeFacultyId: state.facultyProfiles.activeFacultyId,
        activeTab: getTabFromIdentifier(state.facultyProfiles.activeTabIdentifier),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onTabChange(tab) {
            dispatch(activeTabChanged(tab));
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
    withRouter,
)(FacultyDetail);

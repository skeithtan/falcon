import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import FacultyLoadingHeader from "./FacultyLoadingHeader";
import styles from "./styles";


function mapStateToProps(state) {
    return {
        activeTabIdentifier: state.facultyLoading.activeTabIdentifier,
    };
}

export default compose(
    connect(mapStateToProps, null),
    withTheme(),
    withStyles(styles),
    withRouter,
)(FacultyLoadingHeader);
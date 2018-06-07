import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { FacultyLoadingHeader as Component } from "./FacultyLoadingHeader";
import { styles } from "./styles";


const mapStateToProps = state => ({
    activeTabIdentifier: state.facultyLoading.activeTabIdentifier,
});

export const FacultyLoadingHeader = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
    withRouter,
)(Component);
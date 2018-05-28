import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { FacultyLoadingPage as Component } from "./FacultyLoading";
import { styles } from "./styles";


export const FacultyLoadingPage = compose(
    withStyles(styles),
    withRouter,
)(Component);
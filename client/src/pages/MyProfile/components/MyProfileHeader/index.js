import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { MyProfileHeader as Component } from "./MyProfileHeader";
import { styles } from "./styles";


export const MyProfileHeader = compose(
    withStyles(styles),
    withRouter,
)(Component);
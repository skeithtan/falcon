import { withStyles, withTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import PageDrawer from "./PageDrawer";
import styles from "./styles";


export default compose(
    withRouter,
    withTheme(),
    withStyles(styles),
)(PageDrawer);
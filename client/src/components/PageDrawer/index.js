import { withTheme, withStyles } from "material-ui/styles";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import PageDrawer from "./PageDrawer";
import styles from "./styles";


export default compose(
    withRouter,
    withTheme(),
    withStyles(styles),
)(PageDrawer);
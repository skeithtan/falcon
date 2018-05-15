import { withStyles, withTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import NotFoundPage from "./NotFound";
import styles from "./styles";


export default compose(
    withStyles(styles),
    withTheme(),
    withRouter,
)(NotFoundPage);
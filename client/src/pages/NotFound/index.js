import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import NotFoundPage from "./NotFound";
import styles from "./styles";


export default compose(
    withStyles(styles),
    withRouter,
)(NotFoundPage);
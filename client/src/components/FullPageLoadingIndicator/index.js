import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(FullPageLoadingIndicator);
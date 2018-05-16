import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import styles from "./styles";
import Uploader from "./Uploader";


export default compose(
    withTheme(),
    withStyles(styles),
)(Uploader);
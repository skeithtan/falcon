import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import styles from "./styles";
import Uploader from "./Uploader";


export default compose(
    withStyles(styles),
)(Uploader);
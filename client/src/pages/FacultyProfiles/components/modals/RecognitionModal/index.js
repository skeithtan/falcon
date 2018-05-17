import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import RecognitionModal from "./RecognitionModal";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(RecognitionModal);

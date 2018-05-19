import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FacultyLoadingHeader from "./FacultyLoadingHeader";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(FacultyLoadingHeader);
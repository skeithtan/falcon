import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FacultyLoadingPage from "./FacultyLoading";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(FacultyLoadingPage);
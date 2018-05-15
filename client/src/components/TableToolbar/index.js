import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import styles from "./styles";
import TableToolbar from "./TableToolbar";


export default compose(
    withTheme(),
    withStyles(styles),
)(TableToolbar);
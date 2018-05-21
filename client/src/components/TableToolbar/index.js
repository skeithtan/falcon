import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import styles from "./styles";
import TableToolbar from "./TableToolbar";


export default compose(
    withStyles(styles),
)(TableToolbar);
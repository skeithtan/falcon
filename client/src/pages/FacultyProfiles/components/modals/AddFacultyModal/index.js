import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import AddFacultyModal from "./AddFacultyModal";
import styles from "./styles";


export default compose(
    withStyles(styles),
    withTheme(),
)(AddFacultyModal);
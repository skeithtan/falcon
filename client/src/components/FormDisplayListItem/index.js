import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FormDisplayListItem from "./FormDisplayListItem";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(FormDisplayListItem);

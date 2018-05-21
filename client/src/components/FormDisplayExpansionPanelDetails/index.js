import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FormDisplayExpansionPanelDetails from "./FormDisplayExpansionPanelDetails";
import styles from "./styles";


export default compose(
    withStyles(styles),
)(FormDisplayExpansionPanelDetails);
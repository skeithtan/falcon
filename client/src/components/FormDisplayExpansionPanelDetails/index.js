import { withStyles, withTheme } from "material-ui/styles";
import { compose } from "recompose";
import FormDisplayExpansionPanelDetails from "./FormDisplayExpansionPanelDetails";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(FormDisplayExpansionPanelDetails);
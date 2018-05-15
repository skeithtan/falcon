import { withStyles, withTheme } from "@material-ui/core/styles";
import { compose } from "recompose";
import DetailExpansionCardActions from "./DetailExpansionCardActions";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(DetailExpansionCardActions);
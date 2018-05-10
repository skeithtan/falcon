import { withStyles, withTheme } from "material-ui/styles";
import { compose } from "recompose";
import OverviewCard from "./OverviewCard";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(OverviewCard);
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import OverviewTab from "./OverviewTab";
import styles from "./styles";

export default compose(
    withTheme(),
    withStyles(styles),
)(OverviewTab);
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import FullPageLoadingIndicator from "./FullPageLoadingIndicator";
import styles from "./styles";

export default compose(
    withTheme(),
    withStyles(styles),
)(FullPageLoadingIndicator);
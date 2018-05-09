import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import DetailCard from "./DetailCard";
import styles from "./styles";

export default compose(
    withTheme(),
    withStyles(styles),
)(DetailCard);
import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import OverviewCard from "./OverviewCard";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(OverviewCard);
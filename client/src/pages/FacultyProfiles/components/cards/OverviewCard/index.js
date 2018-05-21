import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import OverviewCard from "./OverviewCard";
import styles from "./styles";


export default compose(
    withStyles(styles),
)(OverviewCard);
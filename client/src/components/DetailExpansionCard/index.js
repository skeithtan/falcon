import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import DetailExpansionCard from "./DetailExpansionCard";
import styles from "./styles";


export default compose(
    withStyles(styles),
)(DetailExpansionCard);
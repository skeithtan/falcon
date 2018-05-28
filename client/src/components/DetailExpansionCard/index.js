import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { DetailExpansionCard as Component } from "./DetailExpansionCard";
import { styles } from "./styles";


export const DetailExpansionCard = compose(
    withStyles(styles),
)(Component);
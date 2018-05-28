import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { DetailExpansionCardActions as Component } from "./DetailExpansionCardActions";
import { styles } from "./styles";


export const DetailExpansionCardActions = compose(
    withStyles(styles),
)(Component);
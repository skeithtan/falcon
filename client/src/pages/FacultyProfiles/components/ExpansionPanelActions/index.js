import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { ExpansionPanelActions as Component } from "./ExpansionPanelActions";
import { styles } from "./styles";


export const ExpansionPanelActions = compose(
    withStyles(styles),
)(Component);
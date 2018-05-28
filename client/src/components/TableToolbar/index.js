import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { TableToolbar as Component } from "./TableToolbar";


export const TableToolbar = compose(
    withStyles(styles),
)(Component);
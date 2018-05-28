import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { EmptyState as Component } from "./EmptyState";


export const EmptyState = compose(
    withStyles(styles),
)(Component);

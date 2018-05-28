import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { ErrorState as Component } from "./ErrorState";


export const ErrorState = compose(
    withStyles(styles),
)(Component);

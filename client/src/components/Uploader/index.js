import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { Uploader as Component } from "./Uploader";


export const Uploader = compose(
    withStyles(styles),
)(Component);
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { PresentationsTab as Component } from "./PresentationsTab";


export const PresentationsTab = compose(
    withStyles(styles),
)(Component);
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { ExtensionWorksTab as Component } from "./ExtensionWorksTab";


export const ExtensionWorksTab = compose(
    withStyles(styles),
)(Component);
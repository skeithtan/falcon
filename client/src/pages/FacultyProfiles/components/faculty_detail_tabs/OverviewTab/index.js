import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { OverviewTab as Component } from "./OverviewTab";


export const OverviewTab = compose(
    withStyles(styles),
)(Component);
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { OverviewCard as Component } from "./OverviewCard";
import { styles } from "./styles";


export const OverviewCard = compose(
    withStyles(styles),
)(Component);
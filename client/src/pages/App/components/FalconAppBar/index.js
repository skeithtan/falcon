import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { FalconAppBar as Component } from "./FalconAppBar";
import { styles } from "./styles";


export const FalconAppBar = compose(
    withStyles(styles),
    withRouter,
)(Component);
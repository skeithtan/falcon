import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { NotFoundPage as Component } from "./NotFound";
import { styles } from "./styles";


export const NotFoundPage = compose(
    withStyles(styles),
    withRouter,
)(Component);
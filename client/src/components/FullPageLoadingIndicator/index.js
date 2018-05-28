import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FullPageLoadingIndicator as Component } from "./FullPageLoadingIndicator";
import { styles } from "./styles";


export const FullPageLoadingIndicator = compose(
    withStyles(styles),
)(Component);
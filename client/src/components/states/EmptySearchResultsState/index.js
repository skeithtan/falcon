import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { EmptySearchResultsState as Component } from "./EmptySearchResultsState";


export const EmptySearchResultsState = compose(
    withStyles(styles),
)(Component);

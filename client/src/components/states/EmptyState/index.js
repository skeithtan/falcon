import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import style from "../styles";
import EmptyState from "./EmptyState";


export default compose(
    withStyles(style),
)(EmptyState);

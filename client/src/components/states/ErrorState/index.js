import { withStyles, withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import style from "../styles";
import ErrorState from "./ErrorState";


export default compose(
    withTheme(),
    withStyles(style),
)(ErrorState);

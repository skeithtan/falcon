import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import style from "../styles";
import ErrorState from "./ErrorState";


export default compose(
    withStyles(style),
)(ErrorState);

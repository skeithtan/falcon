import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import ErrorState from "./ErrorState";
import style from "../styles";


export default compose(
    withTheme(),
    withStyles(style),
)(ErrorState);

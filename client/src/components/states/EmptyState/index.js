import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import EmptyState from "./EmptyState";
import style from "../styles";


export default compose(
    withTheme(),
    withStyles(style),
)(EmptyState);

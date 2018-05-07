import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import EmptySearchResultsState from "./EmptySearchResultsState";
import style from "../styles";


export default compose(
    withTheme(),
    withStyles(style),
)(EmptySearchResultsState);

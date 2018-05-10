import { withStyles, withTheme } from "material-ui/styles";
import { compose } from "recompose";
import style from "../styles";
import EmptySearchResultsState from "./EmptySearchResultsState";


export default compose(
    withTheme(),
    withStyles(style),
)(EmptySearchResultsState);

import { withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import OverviewTab from "./OverviewTab";


export default compose(
    withTheme(),
)(OverviewTab);
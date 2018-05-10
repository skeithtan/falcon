import { withTheme } from "material-ui/styles";
import { compose } from "recompose";
import OverviewTab from "./OverviewTab";


export default compose(
    withTheme(),
)(OverviewTab);
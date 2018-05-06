import { compose } from "recompose";
import { withTheme, withStyles } from "material-ui/styles";

import style from "./styles";
import FacultyList from "./FacultyList";

export default compose(
    withTheme(),
    withStyles(style),
)(FacultyList);

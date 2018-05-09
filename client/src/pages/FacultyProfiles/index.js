import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import style from "./styles";
import FacultyProfilesPage from "./FacultyProfiles";


export default compose(
    withTheme(),
    withStyles(style),
)(FacultyProfilesPage);
import { withStyles, withTheme } from "@material-ui/core/styles";
import { compose } from "recompose";
import FacultyProfilesPage from "./FacultyProfiles";
import style from "./styles";


export default compose(
    withTheme(),
    withStyles(style),
)(FacultyProfilesPage);
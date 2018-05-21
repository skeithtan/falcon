import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import FacultyProfilesPage from "./FacultyProfiles";
import style from "./styles";


export default compose(
    withStyles(style),
)(FacultyProfilesPage);
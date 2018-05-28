import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FacultyProfilesPage as Component } from "./FacultyProfiles";
import { styles } from "./styles";


export const FacultyProfilesPage = compose(
    withStyles(styles),
)(Component);
import { MyProfilePage as Component } from "./MyProfile";
import compose from "recompose/compose";
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles";

export const MyProfilePage = compose(
    withStyles(styles),
)(Component);
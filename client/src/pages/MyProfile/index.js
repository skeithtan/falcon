import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { MyProfilePage as Component } from "./MyProfile";
import { styles } from "./styles";


export const MyProfilePage = compose(
    withStyles(styles),
)(Component);
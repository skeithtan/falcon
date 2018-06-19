import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { UserMenu as Component } from "./UserMenu";


export const UserMenu = compose(
    withStyles(styles),
)(Component);
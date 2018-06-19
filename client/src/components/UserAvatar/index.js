import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { UserAvatar as Component } from "./UserAvatar";


export const UserAvatar = compose(
    withStyles(styles),
)(Component);

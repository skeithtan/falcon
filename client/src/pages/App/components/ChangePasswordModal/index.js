import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../components/styles";
import { ChangePasswordModal as Component } from "./ChangePasswordModal";


export const ChangePasswordModal = compose(
    withStyles(genericModalStyle),
)(Component);
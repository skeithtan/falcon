import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { ModalFormDialogActions as Component } from "./ModalFormDialogActions";
import { styles } from "./styles";


export const ModalFormDialogActions = compose(
    withStyles(styles),
)(Component);
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import ModalFormDialogActions from "./ModalFormDialogActions";
import styles from "./styles";


export default compose(
    withStyles(styles),
)(ModalFormDialogActions);
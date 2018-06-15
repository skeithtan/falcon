import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { ProfilePrintPreview as Component } from "./ProfilePrintPreview";
import { styles } from "./styles";


export const ProfilePrintPreview = compose(
    withStyles(styles),
)(Component);
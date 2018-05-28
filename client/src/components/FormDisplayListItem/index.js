import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FormDisplayListItem as Component } from "./FormDisplayListItem";
import { styles } from "./styles";


export const FormDisplayListItem = compose(
    withStyles(styles),
)(Component);

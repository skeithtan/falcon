import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { FormDisplayExpansionPanelDetails as Component } from "./FormDisplayExpansionPanelDetails";
import { styles } from "./styles";


export const FormDisplayExpansionPanelDetails = compose(
    withStyles(styles),
)(Component);
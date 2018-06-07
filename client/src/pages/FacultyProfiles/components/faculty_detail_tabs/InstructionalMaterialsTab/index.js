import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";
import { InstructionalMaterialsTab as Component } from "./InstructionalMaterialsTab";


export const InstructionalMaterialsTab = compose(
    withStyles(styles),
)(Component);
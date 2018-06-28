import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "../styles";


export const wrap = compose(
    withStyles(styles),
);
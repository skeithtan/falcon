import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { withRouter } from "react-router-dom";

export const wrap = compose(
    withStyles(styles),
    withRouter
);

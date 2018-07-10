import { styles } from "./styles";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";

export const wrap = compose(withStyles(styles));

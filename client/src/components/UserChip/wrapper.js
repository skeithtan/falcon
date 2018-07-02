import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { chip } from "../styles";


export const wrapper = compose(
    withStyles(chip),
);
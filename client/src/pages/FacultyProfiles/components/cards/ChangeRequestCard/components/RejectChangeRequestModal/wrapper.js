import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../../../components/styles";


export const wrap = compose(
    withStyles(genericModalStyle),
);
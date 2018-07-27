import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { genericModalStyle } from "../../../../../../components/styles";

export const wrap = compose(withStyles(genericModalStyle));

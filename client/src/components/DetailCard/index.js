import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { DetailCard as Component } from "./DetailCard";
import { styles } from "./styles";


export const DetailCard = compose(
    withStyles(styles),
)(Component);
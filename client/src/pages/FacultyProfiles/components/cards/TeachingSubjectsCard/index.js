import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { TeachingSubjectsCard as Component } from "./TeachingSubjectsCard";


export const TeachingSubjectsCard = compose(
    withStyles(styles),
)(Component);
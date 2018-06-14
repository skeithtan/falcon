import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { chip } from "../styles";
import { SubjectChip as Component } from "./SubjectChip";


export const SubjectChip = compose(
    withStyles(chip),
    withRouter,
)(Component);
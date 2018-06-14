import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { chip } from "../styles";
import { FacultyChip as Component } from "./FacultyChip";


export const FacultyChip = compose(
    withStyles(chip),
    withRouter,
)(Component);
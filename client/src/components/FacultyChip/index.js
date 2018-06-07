import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { FacultyChip as Component } from "./FacultyChip";


export const FacultyChip = compose(
    withRouter,
)(Component);
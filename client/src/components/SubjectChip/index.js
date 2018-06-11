import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { SubjectChip as Component } from "./SubjectChip";


export const SubjectChip = compose(
    withRouter,
)(Component);
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    user: state.authentication.user,
    faculties: state.faculty.faculties,
    subjects: state.subject.subjects,
});

export const wrap = compose(
    connect(
        mapStateToProps,
        null
    ),
    withStyles(styles)
);

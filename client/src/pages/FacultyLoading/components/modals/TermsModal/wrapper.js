import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { styles } from "./styles";

const mapStateToProps = state => ({
    termSchedules: state.facultyLoading.termSchedules,
    user: state.authentication.user,
});

export const wrap = compose(
    connect(
        mapStateToProps,
        null
    ),
    withStyles(styles),
    withRouter
);

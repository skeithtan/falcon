import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "./styles";
import { SubjectsDetail as Component } from "./SubjectsDetail";


const mapStateToProps = state => ({
    ...state.subject,
});

export const SubjectsDetail = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);
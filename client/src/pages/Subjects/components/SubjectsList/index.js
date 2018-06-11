import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { SubjectsList as Component } from "./SubjectsList";
import { styles } from "./styles";


const mapStateToProps = state => ({
    ...state.subject,
});

export const SubjectsList = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);

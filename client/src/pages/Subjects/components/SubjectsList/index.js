import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "./styles";
import { SubjectsList as Component } from "./SubjectsList";


const mapStateToProps = state => ({
    ...state.subject,
    user: state.authentication.user,
});

export const SubjectsList = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FacultyListItem as Component } from "./FacultyListItem";
import { styles } from "./styles";


const mapStateToProps = state => ({
    changeRequests: state.changeRequests,
});

export const FacultyListItem = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);
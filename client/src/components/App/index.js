import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { App as Component } from "./App";
import { styles } from "./styles";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const App = compose(
    connect(mapStateToProps, null),
    withRouter,
    withStyles(styles),
)(Component);
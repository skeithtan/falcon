import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { PageDrawer as Component } from "./PageDrawer";
import { styles } from "./styles";


function mapStateToProps(state) {
    return {
        user: state.authentication.user,
    };
}

export const PageDrawer = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
    withRouter,
)(Component);
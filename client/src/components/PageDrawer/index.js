import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import PageDrawer from "./PageDrawer";
import styles from "./styles";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export default compose(
    connect(mapStateToProps, null),
    withRouter,
    withTheme(),
    withStyles(styles),
)(PageDrawer);
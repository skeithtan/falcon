import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { pageIsChanged } from "../../actions/pages.actions";
import { getPageFromIdentifier } from "../../pages";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import App from "./App";

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        activePage: getPageFromIdentifier(state.pages.activePageIdentifier),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setActivePage(page) {
            dispatch(pageIsChanged(page));
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withStyles(styles)
)(App);
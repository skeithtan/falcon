import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { pageIsChanged } from "../../actions/pages.actions";
import { getPageFromIdentifier } from "../../pages";
import { App as Component } from "./App";
import { styles } from "./styles";


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

export const App = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withStyles(styles),
)(Component);
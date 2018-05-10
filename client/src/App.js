import { MuiThemeProvider } from "material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { pageIsChanged } from "./actions/pages.actions";
import FalconAppBar from "./components/FalconAppBar";
import { getPageFromIdentifier, getPageFromPath, HOME_PAGE, PAGES, SIGN_IN_PAGE } from "./pages";


class App extends Component {
    static getDerivedStateFromProps(nextProps) {
        const {isAuthenticated, match, history, setActivePage, activePage} = nextProps;
        const currentPath = match.params.currentPage;

        // Is the user in the sign in page or any of its descendants?
        const userIsSigningIn = currentPath === SIGN_IN_PAGE.path;

        // If user is not signed in and trying to access any other page
        if (!isAuthenticated && !userIsSigningIn) {
            //Force them to sign in
            history.replace(SIGN_IN_PAGE.path);
            setActivePage(SIGN_IN_PAGE);
            return {};
        }

        // We can't let them sign in if they're already signed in
        if (isAuthenticated && userIsSigningIn) {
            history.replace(HOME_PAGE.path);
            setActivePage(HOME_PAGE);
            return {};
        }

        // Our homepage is in /home, redirect anyone authenticated to it
        if (!currentPath) {
            history.replace(HOME_PAGE.path);
            setActivePage(HOME_PAGE);
            return {};
        }

        // If current path is not the same path as the active page in Redux
        if (activePage.path !== currentPath) {
            // Reflect the current path to Redux
            setActivePage(getPageFromPath(currentPath));
        }
        return {};
    }

    render() {
        const {isAuthenticated, activePage} = this.props;
        const routes = PAGES.map(({identifier, path, component}) => (
            <Route key={identifier} path={"/" + path} component={component} />
        ));
        return (
            <MuiThemeProvider theme={activePage.theme}>
                {isAuthenticated && <FalconAppBar />}
                {routes}
            </MuiThemeProvider>
        );
    }

    //Useless line but gets rid of annoying error
    state = {};
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

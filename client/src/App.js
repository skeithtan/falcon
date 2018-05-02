import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MuiThemeProvider } from "material-ui/styles";

import { PAGES, HOME_PAGE, SIGN_IN_PAGE, getPageFromIdentifier, getPageFromRoute } from "./pages/pages";
import { setActivePage as makeSetActivePageAction } from "./actions/pages.actions";
import FalconAppBar from "./components/FalconAppBar";
import "./App.css";


class App extends Component {
    //Useless line but gets rid of annoying error
    state = {};

    static reflectRouteToActivePage({currentRoute, activePage, setActivePage}) {
        const currentRouteIsActivePage = currentRoute.startsWith(activePage.route);

        if (!currentRouteIsActivePage) {
            const currentPage = getPageFromRoute(currentRoute);
            setActivePage(currentPage);
        }
    }

    static getDerivedStateFromProps(nextProps) {
        const {isAuthenticated, location, history} = nextProps;
        const currentRoute = location.pathname;

        //Is the user in the sign in page or any of its descendants?
        const userIsSigningIn = currentRoute.startsWith(SIGN_IN_PAGE.route);

        //If user is not signed in and trying to access any other page
        if (!isAuthenticated && !userIsSigningIn) {
            //Force them to sign in
            history.replace(SIGN_IN_PAGE.route);
        }

        //We can't let them sign in if they're already signed in
        if (isAuthenticated && userIsSigningIn) {
            history.replace(HOME_PAGE.route);
        }

        //Our homepage is in /home, redirect anyone authenticated to it
        if (currentRoute === "/") {
            history.replace(HOME_PAGE.route);
        }

        const {activePage, setActivePage} = nextProps;
        App.reflectRouteToActivePage({currentRoute, activePage, setActivePage});

        return {};
    }


    render() {
        const {isAuthenticated, activePage} = this.props;

        const routes = PAGES.map(({identifier, route, component}) =>
            <Route key={identifier} path={route} component={component} />,
        );

        return (
            <MuiThemeProvider theme={activePage.theme}>
                {isAuthenticated && <FalconAppBar />}
                {routes}
            </MuiThemeProvider>
        );
    }
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
            dispatch(makeSetActivePageAction(page));
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

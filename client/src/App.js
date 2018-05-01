import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { PAGES, HOME_PAGE, SIGN_IN_PAGE } from "./pages/pages";
import { setActivePage as makeSetActivePageAction } from "./actions/pages.actions";
import "./App.css";


class App extends Component {
    //Useless line but gets rid of annoying error
    state = {};

    static getDerivedStateFromProps(nextProps) {
        const {isAuthenticated, location, history} = nextProps;

        //Is the user in the sign in page or any of its descendants?
        const userIsSigningIn = location.pathname.startsWith(SIGN_IN_PAGE.route);

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
        if (location.pathname === "/") {
            history.replace(HOME_PAGE.route);
        }

        return null;
    }


    render() {
        const routes = PAGES.map(({identifier, route, component}) =>
            <Route key={identifier} path={route} component={component}/>,
        );


        return (
            <div className="App">
                {routes}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
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

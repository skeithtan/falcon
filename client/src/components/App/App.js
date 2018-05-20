import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getPageFromPath, HOME_PAGE, PAGES, SIGN_IN_PAGE } from "../../pages";
import FalconAppBar from "../FalconAppBar";


export default class App extends Component {
    // Required by getDerivedStateFromProps
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        const {isAuthenticated, match, history, setActivePage, activePage} = nextProps;
        const currentPath = match.params.currentPage;
        // Is the user in the sign in page or any of its descendants?
        const userIsSigningIn = currentPath === SIGN_IN_PAGE.path;

        // If user is not signed in and trying to access any other page
        if (!isAuthenticated && !userIsSigningIn) {
            //Force them to sign in
            history.replace("/" + SIGN_IN_PAGE.path); // The slash is to specify that it's the root
            setActivePage(SIGN_IN_PAGE);
            return prevState;
        }

        // We can't let them sign in if they're already signed in
        if (isAuthenticated && userIsSigningIn) {
            history.replace(HOME_PAGE.path);
            setActivePage(HOME_PAGE);
            return prevState;
        }

        // Our homepage is in /home, redirect anyone authenticated to it
        if (!currentPath) {
            history.replace(HOME_PAGE.path);
            setActivePage(HOME_PAGE);
            return prevState;
        }

        // If current path is not the same path as the active page in Redux
        if (activePage.path !== currentPath) {
            // Reflect the current path to Redux
            setActivePage(getPageFromPath(currentPath));
        }
        return prevState;
    }

    render() {
        const {isAuthenticated, activePage, classes} = this.props;
        const routes = PAGES.map(({identifier, path, component}) => (
            <Route key={identifier} path={"/" + path} component={component} />
        ));
        return (
            <MuiThemeProvider theme={activePage.theme}>
                <Grid
                    container
                    className={classes.appContainer}
                    direction="column"
                    alignItems="stretch"
                    wrap="nowrap"
                >
                    {isAuthenticated &&
                    <Grid item>
                        <FalconAppBar />
                    </Grid>
                    }
                    <Grid
                        item
                        className={classes.pageContainer}
                    >
                        <Switch>
                            {routes}
                            <Redirect to="/404" />
                        </Switch>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}



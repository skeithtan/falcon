import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { GENERAL_PAGES, getPageFromPath, getPagesForUserType, HOME_PAGE, SIGN_IN_PAGE } from "../index";
import { FalconAppBar } from "./components/FalconAppBar/index";
import { Toast } from "./components/Toast";


export class App extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handlePath();
    }

    componentDidMount() {
        this.handlePath();
    }

    handlePath = () => {
        const {user, match, history} = this.props;

        const currentPath = match.params.currentPage;
        // Is the user in the sign in page or any of its descendants?
        const userIsSigningIn = currentPath === SIGN_IN_PAGE.path;

        // If user is not signed in and trying to access any other page
        if (!user && !userIsSigningIn) {
            //Force them to sign in
            history.replace("/" + SIGN_IN_PAGE.path); // The slash is to specify that it's the root
        }

        // We can't show them sign in if they're already signed in
        // UNLESS their password is only temporary
        if (user && userIsSigningIn && !user.temporaryPassword) {
            history.replace(HOME_PAGE.path);
        }

        // Our homepage is in /home, redirect anyone authenticated to it
        if (!currentPath) {
            history.replace(HOME_PAGE.path);
        }
    };

    getActivePage = match => getPageFromPath(match.params.currentPage);

    renderRoutes = () => {
        const {user} = this.props;
        const pageToRoute = ({identifier, path, component}) => (
            <Route key={identifier} path={"/" + path} component={component} />
        );

        // If we have a user, add the pages for the user type in the pages
        const pages = [
            ...GENERAL_PAGES,
            ...user ? getPagesForUserType(user.authorization) : [],
        ];

        return pages.map(pageToRoute);
    };

    render() {
        const {user, match, classes} = this.props;
        const activePage = this.getActivePage(match);
        return (
            <MuiThemeProvider theme={activePage.theme}>
                <Grid
                    container
                    className={classes.appContainer}
                    direction="column"
                    alignItems="stretch"
                    wrap="nowrap"
                >
                    {user && activePage.identifier !== SIGN_IN_PAGE.identifier &&
                    <Grid item>
                        <FalconAppBar />
                    </Grid>
                    }
                    <Grid
                        item
                        className={classes.pageContainer}
                    >
                        <Switch>
                            {this.renderRoutes()}
                            <Redirect to="/404" />
                        </Switch>
                    </Grid>
                </Grid>

                <Toast />
            </MuiThemeProvider>
        );
    }
}



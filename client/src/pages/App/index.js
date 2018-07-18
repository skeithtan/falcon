import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { getDefaultPageForUser, getPagesForUser } from "../../utils/user.util";
import { GENERAL_PAGES, getPageFromPath, SIGN_IN_PAGE } from "../index";
import { FalconAppBar } from "./components/FalconAppBar/index";
import { Toast } from "./components/Toast";
import { wrap } from "./wrapper";

class BaseApp extends PureComponent {
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handlePath();
    }

    componentDidMount() {
        this.handlePath();
    }

    handlePath = () => {
        const { user, match, history } = this.props;

        const currentPath = match.params.currentPage;
        // Is the user in the sign in page or any of its descendants?
        const userIsSigningIn = currentPath === SIGN_IN_PAGE.path;

        if (!user) {
            // If user is not signed in and trying to access any other page
            if (!userIsSigningIn) {
                // Force them to sign in
                // The slash is to specify that it's the root
                history.replace("/" + SIGN_IN_PAGE.path);
            }

            // We want to ensure the next conditions have a non-null user
            return;
        }

        // If the user has a temporary password and they're not in the sign in page
        if (user.temporaryPassword && !userIsSigningIn) {
            // Force them to change it
            history.replace("/" + SIGN_IN_PAGE.path);
            return;
        }

        const defaultPage = getDefaultPageForUser(user);

        if (!user.temporaryPassword && userIsSigningIn) {
            // We can't show them sign in if they're already signed in
            history.replace(defaultPage.path);
            return;
        }

        // If there is no current path, redirect to user's default home page
        if (!currentPath) {
            history.replace(defaultPage.path);
        }
    };

    getActivePage = match => getPageFromPath(match.params.currentPage);

    renderRoutes = () => {
        const { user } = this.props;
        const pageToRoute = ({
            identifier,
            path,
            component,
            pathParameter = "",
        }) => (
            <Route
                key={identifier}
                path={"/" + path + pathParameter}
                component={component}
            />
        );

        // If we have a user, add the pages for the user type in the pages
        const pages = [
            ...GENERAL_PAGES,
            ...(user ? getPagesForUser(user) : []),
        ];

        return pages.map(pageToRoute);
    };

    render() {
        const { user, match, classes } = this.props;
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
                    {user &&
                        activePage.identifier !== SIGN_IN_PAGE.identifier && (
                            <Grid item>
                                <FalconAppBar activePage={activePage} />
                            </Grid>
                        )}
                    <Grid item className={classes.pageContainer}>
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

export const App = wrap(BaseApp);

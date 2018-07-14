import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";
import { NotificationsButton } from "../notifications/NotificationsButton";
import { PageDrawer } from "../PageDrawer";
import { UserButton } from "../UserButton";
import { wrap } from "./wrapper";


class BaseFalconAppBar extends Component {
    state = {
        drawerOpen: false,
    };

    render() {
        const {classes, activePage} = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar} disableGutters>
                    <Grid container justify="space-between" alignItems="center" wrap="nowrap">
                        <Grid item>
                            <Grid container alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <IconButton
                                        color="inherit"
                                        aria-label="Menu"
                                        className={classes.hamburger}
                                        onClick={() => this.setState({drawerOpen: true})}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        color="inherit"
                                        className={classes.falconLogo}>
                                        Falcon
                                    </Typography>
                                    <Typography
                                        color="inherit"
                                        className={classes.pageName}>
                                        {activePage.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Grid container spacing={8} alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <NotificationsButton />
                                </Grid>
                                <Grid item>
                                    <UserButton />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>

                <PageDrawer
                    open={this.state.drawerOpen}
                    onClose={() => this.setState({drawerOpen: false})}
                />
            </AppBar>
        );
    }
}

export const FalconAppBar = wrap(BaseFalconAppBar);
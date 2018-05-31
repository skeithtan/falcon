import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";
import { getPageFromIdentifier, getPageFromPath } from "../../pages";
import { PageDrawer } from "../PageDrawer";
import { UserButton } from "../UserButton";


export class FalconAppBar extends Component {
    state = {
        drawerOpen: false,
    };

    getActivePage = match => getPageFromPath(match.params.currentPage);

    render() {
        const {classes, match} = this.props;
        const activePage = this.getActivePage(match);
        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton color="inherit"
                                aria-label="Menu"
                                className={classes.hamburger}
                                onClick={() => this.setState({drawerOpen: true})}>
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.pageTitle}>
                        <Typography color="inherit" className={classes.falconLogo}>Falcon</Typography>
                        <Typography color="inherit" className={classes.pageName}>{activePage.name}</Typography>
                    </div>
                    <UserButton />
                </Toolbar>

                <PageDrawer open={this.state.drawerOpen}
                            onClose={() => this.setState({drawerOpen: false})} />

            </AppBar>
        );
    }
}
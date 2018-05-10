import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import { getPageFromIdentifier } from "../../pages";
import PageDrawer from "../PageDrawer";
import UserMenu from "../UserButton";


export default class FalconAppBar extends Component {
    pageTitle = () => {
        const activePage = getPageFromIdentifier(this.props.activePageIdentifier);
        return activePage.name;
    };

    render() {
        const {classes} = this.props;
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
                        <Typography color="inherit" className={classes.pageName}>{this.pageTitle()}</Typography>
                    </div>
                    <UserMenu />
                </Toolbar>

                <PageDrawer open={this.state.drawerOpen}
                            onClose={() => this.setState({drawerOpen: false})} />

            </AppBar>
        );
    }

    state = {
        drawerOpen: false,
    };
}
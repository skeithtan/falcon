import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "material-ui/Typography";


import PageMenu from "../PageMenu";
import UserMenu from "../UserButton";
import { getPageFromIdentifier } from "../../pages/pages";
import style from "./FalconAppBar.css";


class PageTitle extends Component {
    render() {
        return (
            <div id={style.pageTitle}>
                <Typography color="inherit" id={style.falconLogo}>Falcon</Typography>
                <Typography color="inherit" id={style.pageName}>{this.props.children}</Typography>
            </div>
        );
    }
}

export default class FalconAppBar extends Component {
    state = {
        anchor: null,
    };

    toggleMenu = (event) => {
        this.setState({
            anchor: event === null ? null : event.currentTarget,
        });
    };

    pageTitle = () => {
        const activePage = getPageFromIdentifier(this.props.activePageIdentifier);
        return activePage.name;
    };

    render() {
        const {anchor} = this.state;

        return (
            <AppBar position="static" id={style.appBar}>
                <Toolbar id={style.toolbar}>
                    <IconButton color="inherit"
                                aria-label="Menu"
                                id={style.hamburger}
                                onClick={this.toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <PageTitle>{this.pageTitle()}</PageTitle>
                    <UserMenu />
                </Toolbar>

                <PageMenu open={Boolean(anchor)}
                          anchorEl={anchor}
                          onClose={() => this.toggleMenu(null)} />
            </AppBar>
        );
    }
}
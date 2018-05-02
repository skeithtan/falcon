import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "material-ui/Typography";


import PageMenu from "../PageMenu";
import { getPageFromIdentifier } from "../../pages/pages";
import style from "./FalconAppBar.css";


class PageTitle extends Component {
    render() {
        return (
            <div>
                <Typography color="inherit" id={style.falconLogo}>Falcon</Typography>
                <Typography color="inherit" id={style.pageTitle}>{this.props.children}</Typography>
            </div>
        );
    }
}

export default class FalconAppBar extends Component {
    state = {
        menuOpen: false,
    };

    toggleMenu = () => {
        this.setState({menuOpen: !this.state.menuOpen});
    };

    pageTitle = () => {
        const activePage = getPageFromIdentifier(this.props.activePageIdentifier);
        return activePage.name;
    };

    render() {
        return (
            <AppBar position="static" id={style.appBar}>
                <Toolbar>
                    <IconButton color="inherit"
                                aria-label="Menu"
                                id={style.hamburger}
                                onClick={this.toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <PageTitle>{this.pageTitle()}</PageTitle>
                </Toolbar>

                <PageMenu open={this.state.menuOpen} toggle={this.toggleMenu} />
            </AppBar>
        );
    }
}
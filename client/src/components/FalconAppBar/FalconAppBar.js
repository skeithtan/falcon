import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "material-ui/Typography";


import { getPageFromIdentifier } from "../../pages/pages";
import "./FalconAppBar.css";


class PageTitle extends Component {
    render() {
        return (
            <div>
                <Typography color="inherit" id="falcon-logo">Falcon</Typography>
                <Typography color="inherit" id="page-title">{this.props.children}</Typography>
            </div>
        );
    }
}

export default class FalconAppBar extends Component {
    pageTitle = () => {
        const activePage = getPageFromIdentifier(this.props.activePageIdentifier);
        return activePage.name;
    };

    render() {
        console.log(this.pageTitle());

        return (
            <AppBar position="static" id="falcon-app-bar">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" id="app-bar-hamburger">
                        <MenuIcon/>
                    </IconButton>
                    <PageTitle>{this.pageTitle()}</PageTitle>
                </Toolbar>
            </AppBar>
        );
    }
}
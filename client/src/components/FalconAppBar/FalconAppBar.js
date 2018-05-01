import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "material-ui/Typography";


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
    pageTitle = () => {
        const activePage = getPageFromIdentifier(this.props.activePageIdentifier);
        return activePage.name;
    };

    render() {
        console.log(this.pageTitle());

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" id={style.hamburger}>
                        <MenuIcon/>
                    </IconButton>
                    <PageTitle>{this.pageTitle()}</PageTitle>
                </Toolbar>
            </AppBar>
        );
    }
}
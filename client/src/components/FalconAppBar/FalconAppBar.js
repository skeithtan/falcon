import React, { Component } from "react";
import { AppBar, FlatButton } from "material-ui";
import "./FalconAppBar.css";

class PageTitle extends Component {
    render() {
        return (
            <div id="page-title">
                <span id="falcon-logo">Falcon</span> {this.props.children}
            </div>
        )
    }
}

export default class FalconAppBar extends Component {
    render() {
        const title = (
            <PageTitle>Faculty Schedules</PageTitle>
        );

        return (
            <AppBar title={title} id="falcon-app-bar">
                <div id="user-menu">

                </div>
            </AppBar>
        )
            ;
    }
}
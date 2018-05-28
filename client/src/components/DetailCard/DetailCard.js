import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";


export class DetailCard extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.paper}>
                {this.props.children}
            </Paper>
        );
    }
}

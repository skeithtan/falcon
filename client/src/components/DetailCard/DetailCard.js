import Paper from "material-ui/Paper";
import React, { Component } from "react";


class DetailCard extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <Paper className={classes.paper}>
                {this.props.children}
            </Paper>
        );
    }
}

export default DetailCard;

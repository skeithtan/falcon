import React, { Component } from "react";
import ExpansionPanel from "material-ui/ExpansionPanel";

class DetailExpansionCard extends Component {
    render() {
        const classes = this.props.classes;
        return (
            <ExpansionPanel className={classes.paper}>
                {this.props.children}
            </ExpansionPanel>
        );
    }
}

export default DetailExpansionCard;

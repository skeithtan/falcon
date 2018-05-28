import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import React, { Component } from "react";


export class FormDisplayExpansionPanelDetails extends Component {
    render() {
        return (
            <ExpansionPanelDetails className={this.props.classes.expansionPanelDetails}>
                {this.props.children}
            </ExpansionPanelDetails>
        );
    }
}

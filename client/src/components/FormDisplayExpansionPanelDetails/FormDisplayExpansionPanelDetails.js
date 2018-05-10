import { ExpansionPanelDetails } from "material-ui/ExpansionPanel";
import React, { Component } from "react";


class FormDisplayExpansionPanelDetails extends Component {
    render() {
        return (
            <ExpansionPanelDetails className={this.props.classes.expansionPanelDetails}>
                {this.props.children}
            </ExpansionPanelDetails>
        );
    }
}

export default FormDisplayExpansionPanelDetails;

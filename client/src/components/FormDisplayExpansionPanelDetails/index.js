import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseFormDisplayExpansionPanelDetails extends PureComponent {
    render() {
        const {classes, children} = this.props;
        return (
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                {children}
            </ExpansionPanelDetails>
        );
    }
}

export const FormDisplayExpansionPanelDetails = wrap(BaseFormDisplayExpansionPanelDetails);
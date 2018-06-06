import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import React from "react";


export const FormDisplayExpansionPanelDetails = ({classes, children}) => (
    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        {children}
    </ExpansionPanelDetails>
);


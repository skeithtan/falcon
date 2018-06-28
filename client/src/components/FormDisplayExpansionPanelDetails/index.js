import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import React from "react";
import { wrap } from "./wrapper";


const BaseFormDisplayExpansionPanelDetails = ({classes, children}) => (
    <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        {children}
    </ExpansionPanelDetails>
);

export const FormDisplayExpansionPanelDetails = wrap(BaseFormDisplayExpansionPanelDetails);
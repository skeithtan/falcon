import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import React from "react";


export const DetailExpansionCard = ({classes, children}) => (
    <ExpansionPanel className={classes.paper}>
        {children}
    </ExpansionPanel>
);
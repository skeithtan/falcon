import Paper from "@material-ui/core/Paper";
import React from "react";


export const DetailCard = ({classes, children}) => (
    <Paper className={classes.paper}>
        {children}
    </Paper>
);

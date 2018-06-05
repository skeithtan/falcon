import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";


export const FormDisplayListItem = ({classes, field, value}) => (
    <ListItem divider>
        <div className={classes.gridContainer}>
            <Typography variant="body2">{field}</Typography>
            <ListItemText>{value}</ListItemText>
        </div>
    </ListItem>
);

import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import React from "react";


export const FormDisplayListItem = ({field, value}) => (
    <ListItem divider>
        <Grid container>
            <Grid item sm zeroMinWidth>
                <Typography variant="body2">{field}</Typography>
            </Grid>
            <Grid item sm={9} zeroMinWidth>
                <Typography>{value}</Typography>
            </Grid>
        </Grid>
    </ListItem>
);

import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import React from "react";
import { Link } from "react-router-dom";


export const NotificationItem = ({renderText, renderAvatar, url, onClose}) => (
    <ListItem
        button
        component={Link}
        to={url}
        onClick={onClose}
    >
        <Grid container spacing={16} direction="row" wrap="nowrap" alignItems="center">
            {renderAvatar && <Grid item>
                {renderAvatar()}
            </Grid>
            }
            <Grid item>
                {renderText()}
            </Grid>
        </Grid>
    </ListItem>
);
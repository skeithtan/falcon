import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";


export default class FormDisplayListItem extends Component {
    render() {
        const {classes, field, value} = this.props;
        return (
            <ListItem divider>
                <div className={classes.gridContainer}>
                    <Typography variant="body2">{field}</Typography>
                    <ListItemText>{value}</ListItemText>
                </div>
            </ListItem>
        );
    }
}
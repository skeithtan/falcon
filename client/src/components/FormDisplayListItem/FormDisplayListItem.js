import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { Component } from "react";


export default class FormDisplayListItem extends Component {
    render() {
        const {classes, field, value} = this.props;
        return (
            <ListItem divider>
                <div className={classes.gridContainer}>
                    <ListItemText><b>{field}</b></ListItemText>
                    <ListItemText>{value}</ListItemText>
                </div>
            </ListItem>
        );
    }
}
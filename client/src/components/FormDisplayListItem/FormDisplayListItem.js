import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";

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
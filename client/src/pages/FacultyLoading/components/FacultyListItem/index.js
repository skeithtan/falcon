import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import { UserAvatar } from "../../../../components/UserAvatar";
import { ListItemText } from "../../../../../node_modules/@material-ui/core";
import { getFullName } from "../../../../utils/user.util";
import { wrap } from "./wrapper";

class BaseFacultyListItem extends Component {
    render() {
        const { classes, faculty } = this.props;

        return (
            <Card className={classes.facultyListItemContainer}>
                <ListItem className={classes.listItem}>
                    <UserAvatar user={faculty.user} />
                    <ListItemText
                        primary={getFullName(faculty.user)}
                        secondary={`T-${faculty.idNumber}`}
                    />
                </ListItem>
            </Card>
        );
    }
}

export const FacultyListItem = wrap(BaseFacultyListItem);
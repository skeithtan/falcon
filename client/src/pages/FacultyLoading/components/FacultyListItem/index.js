import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import DragIndicator from "@material-ui/icons/DragIndicator";
import Grid from "@material-ui/core/Grid";
import { UserAvatar } from "../../../../components/UserAvatar";
import { ListItemText } from "@material-ui/core";
import { getFullName } from "../../../../utils/user.util";
import { wrap } from "./wrapper";

class BaseFacultyListItem extends Component {
    render() {
        const { classes, faculty, connectDragSource } = this.props;
        return connectDragSource(
            <div>
                <Card className={classes.facultyListItemContainer}>
                    <Grid
                        container
                        spacing={8}
                        alignItems="center"
                        justify="space-between"
                    >
                        <Grid item>
                            <Grid container spacing={16} direction="row">
                                <Grid item>
                                    <UserAvatar user={faculty.user} />
                                </Grid>
                                <Grid item>
                                    <ListItemText
                                        primary={getFullName(faculty.user)}
                                        secondary={`T-${faculty.idNumber}`}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <DragIndicator color="action" />
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export const FacultyListItem = wrap(BaseFacultyListItem);

import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
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
            <div className={classes.facultyListItemContainer}>
                <Grid
                    container
                    spacing={8}
                    alignItems="center"
                    justify="space-between"
                    wrap="nowrap"
                >
                    <Grid item xs>
                        <Grid
                            container
                            spacing={16}
                            direction="row"
                            wrap="nowrap"
                        >
                            <Grid item>
                                <UserAvatar user={faculty.user} />
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    variant="subheading"
                                    color="inherit"
                                >
                                    {getFullName(faculty.user)}
                                </Typography>
                                <Typography variant="caption">
                                    T-{faculty.idNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <DragIndicator color="action" />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const FacultyListItem = wrap(BaseFacultyListItem);

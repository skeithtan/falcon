import React, { PureComponent } from "react";
import Popover from "@material-ui/core/Popover";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SUBJECT_CATEGORIES } from "../../../enums/class.enums";
import { wrap } from "./wrapper";

class BaseSubjectPopover extends PureComponent {
    render() {
        const { open, classes, anchorEl, onClose, subject } = this.props;

        return (
            <Popover
                open={open}
                className={classes.popover}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                disableRestoreFocus
            >
                <CardContent className={classes.cardContent}>
                    <Grid container direction="column" spacing={16}>
                        <Grid item container direction="column">
                            <Grid item>
                                <Typography variant="body2">
                                    {subject.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="textSecondary">
                                    {SUBJECT_CATEGORIES[subject.category].name}{" "}
                                    Subject
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography color="textSecondary">
                                {subject.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <div />
                </CardContent>
            </Popover>
        );
    }
}

export const SubjectPopover = wrap(BaseSubjectPopover);

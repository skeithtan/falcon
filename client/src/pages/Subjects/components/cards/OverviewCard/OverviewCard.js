import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { UpdateSubjectModal } from "../../modals/UpdateSubjectModal";


export class OverviewCard extends Component {
    state = {
        updateSubjectModalIsShowing: false,
    };

    toggleUpdateSubjectModal = shouldShow => this.setState({
        updateSubjectModalIsShowing: shouldShow,
    });

    render() {
        const {subject, classes, user} = this.props;
        const {updateSubjectModalIsShowing} = this.state;

        return (
            <DetailCard>

                <div className={classes.buttonArea}>
                    <div className={classes.buttonsWrapper}>
                        {user.permissions.MUTATE_FACULTY_PROFILES &&
                        <Tooltip title="Update these details" placement="left">
                            <IconButton onClick={() => this.toggleUpdateSubjectModal(true)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        }
                    </div>
                </div>

                <Grid
                    container
                    className={classes.overviewTitleContainer}
                    spacing={0}
                    direction="column"
                >
                    <Grid item>
                        <Typography variant="title">
                            {subject.code}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading" color="textSecondary">
                            {subject.name}
                        </Typography>
                    </Grid>
                </Grid>

                {updateSubjectModalIsShowing &&
                <UpdateSubjectModal
                    action="update"
                    open={updateSubjectModalIsShowing}
                    onClose={() => this.toggleUpdateSubjectModal(false)}
                    subject={subject}
                />
                }
            </DetailCard>
        );
    }
}
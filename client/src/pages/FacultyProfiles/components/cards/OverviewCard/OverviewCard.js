import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment/moment";
import React, { Component } from "react";
import { DetailCard } from "../../../../../components/DetailCard";
import { FormDisplayListItem } from "../../../../../components/FormDisplayListItem";
import { UserAvatar } from "../../../../../components/UserAvatar";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user.util";
import { UpdateFacultyOverviewModal } from "../../modals/UpdateFacultyOverviewModal";
import { ProfilePrintPreview } from "../../ProfilePrintPreview";


export class OverviewCard extends Component {
    state = {
        updateFacultyModalIsShowing: false,
        profilePrintPreviewIsShowing: false,
    };

    toggleUpdateFacultyModal = shouldShow => this.setState({
        updateFacultyModalIsShowing: shouldShow,
    });

    toggleProfilePrintPreview = shouldShow => this.setState({
        profilePrintPreviewIsShowing: shouldShow,
    });

    componentWillUnmount() {
        this.toggleProfilePrintPreview(false);
    }

    render() {
        const {faculty, classes, user} = this.props;
        const {updateFacultyModalIsShowing, profilePrintPreviewIsShowing} = this.state;
        const birthDate = moment(faculty.birthDate);
        const today = moment();
        const birthDateValue = `${birthDate.format("LL")} (${today.to(birthDate, true)})`;

        return (
            <DetailCard>
                <div className={classes.buttonArea}>
                    <div className={classes.buttonsWrapper}>
                        <Grid container spacing={8}>
                            {user.permissions.MUTATE_FACULTY_PROFILES &&
                            <Grid item>
                                <Tooltip title="Update these details" placement="left">
                                    <IconButton onClick={() => this.toggleUpdateFacultyModal(true)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            }

                            {user.permissions.MUTATE_FACULTY_PROFILES &&
                            <Grid item>
                                <Tooltip title="Reset Faculty Password" placement="left">
                                    <IconButton>
                                        <LockOpenIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            }

                            <Grid item>
                                <Tooltip title="Print Faculty Profile" placement="left">
                                    <IconButton onClick={() => this.toggleProfilePrintPreview(true)}>
                                        <PrintIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className={classes.bigOverview}>
                    <Grid container alignItems="center" direction="row" spacing={40}>
                        <UserAvatar user={faculty.user} className={classes.bigAvatar} />

                        <Grid item>
                            <Grid container direction="column" spacing={0}>
                                <Grid item>
                                    <Typography variant="title">
                                        {getFullName(faculty.user)}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subheading" color="textSecondary">
                                        {EMPLOYMENT[faculty.employment].name} Faculty
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        T-{faculty.idNumber}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <List disablePadding>
                    <FormDisplayListItem field="Email" value={faculty.user.email} />
                    <FormDisplayListItem field="Sex" value={SEX[faculty.sex].name} />
                    <FormDisplayListItem field="Date of Birth" value={birthDateValue} />
                </List>

                <UpdateFacultyOverviewModal
                    action="update"
                    faculty={faculty}
                    open={updateFacultyModalIsShowing}
                    onClose={() => this.toggleUpdateFacultyModal(false)}
                />

                <ProfilePrintPreview
                    faculty={faculty}
                    open={profilePrintPreviewIsShowing}
                    onClose={() => this.toggleProfilePrintPreview(false)}
                />
            </DetailCard>
        );
    }
}
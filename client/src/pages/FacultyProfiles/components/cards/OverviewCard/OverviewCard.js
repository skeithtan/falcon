import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import moment from "moment/moment";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import FormDisplayListItem from "../../../../../components/FormDisplayListItem";
import UserAvatar from "../../../../../components/UserAvatar/UserAvatar";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { getFullName } from "../../../../../utils/user";


export default class OverviewCard extends Component {
    render() {
        const {faculty, classes} = this.props;
        const birthDate = moment(faculty.birthDate);
        const today = moment();
        const birthDateValue = `${birthDate.format("LL")} (${today.to(birthDate, true)})`;
        return (
            <DetailCard>
                <div className={classes.buttonArea}>
                    <div className={classes.buttonsWrapper}>
                        <Tooltip title="Update these details" placement="left">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className={classes.bigOverview}>
                    <Grid container alignItems="center" direction="row" spacing={40}>
                        <UserAvatar user={faculty.user} className={classes.bigAvatar} />

                        <Grid item>
                            <Grid container direction="column">
                                <Typography variant="headline">
                                    {getFullName(faculty.user)}
                                </Typography>
                                <Typography variant="subheading">
                                    {EMPLOYMENT[faculty.employment].name} Faculty
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item>
                        </Grid>

                    </Grid>
                </div>
                <List disablePadding>
                    <FormDisplayListItem field="Email" value={faculty.user.email} />
                    <FormDisplayListItem field="Sex" value={SEX[faculty.sex].name} />
                    <FormDisplayListItem field="Date of Birth" value={birthDateValue} />
                </List>
            </DetailCard>
        );
    }
}
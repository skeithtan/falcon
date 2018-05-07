import React, { Component } from "react";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import List from "material-ui/List";
import moment from "moment";

import FacultyAvatar from "../../../../components/FacultyAvatar/FacultyAvatar";
import FormDisplayListItem from "../../../../components/FormDisplayListItem";
import DetailCard from "../DetailCard";
import FACULTY_ENUMS from "../../../../enums/faculty.enums";


class OverviewCard extends Component {
    render() {
        const {faculty, classes} = this.props;

        const birthDate = moment(faculty.birthDate);
        const today = moment();
        const birthDateValue = `${birthDate.format("LL")} (${today.to(birthDate, true)})`;

        return (
            <DetailCard>
                <div className={classes.bigOverview}>
                    <Grid container alignItems="center" direction="row" spacing={40}>
                        <FacultyAvatar faculty={faculty} className={classes.bigAvatar} />

                        <Grid item>
                            <Grid container direction="column">
                                <Typography variant="headline">
                                    {faculty.user.name.first} {faculty.user.name.last}
                                </Typography>
                                <Typography variant="subheading">
                                    {FACULTY_ENUMS.EMPLOYMENT[faculty.employment]} Faculty
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
                <List disablePadding>
                    <FormDisplayListItem field="Email" value={faculty.user.email} />
                    <FormDisplayListItem field="Sex" value={FACULTY_ENUMS.SEX[faculty.sex]} />
                    <FormDisplayListItem field="Date of Birth" value={birthDateValue}/>
                </List>
            </DetailCard>
        );
    }
}

export default OverviewCard;

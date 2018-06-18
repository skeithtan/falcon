import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { SUBJECTS_PAGE } from "../../../index";
import { FacultyCard } from "../cards/FacultyCard";
import { OverviewCard } from "../cards/OverviewCard";


export class SubjectsDetail extends Component {
    renderSelectSubjectState = () => (
        <div className={this.props.classes.selectSubjectState}>
            <Typography variant="headline" className={this.props.classes.selectSubjectText}>
                Select a subject from the left to see the details
            </Typography>
        </div>
    );

    getActiveSubject = subjectId => this.props.subjects.find(subject => subject._id === subjectId);

    render() {
        const {match: {params: {subjectId}}, isLoading, errors, classes} = this.props;

        const noSelectedSubject = !subjectId;
        const activeSubject = this.getActiveSubject(subjectId);
        const subjectNotFound = !activeSubject && subjectId;

        return (
            <div className={classes.subjectsDetail}>
                {subjectNotFound &&
                <Redirect to={`/${SUBJECTS_PAGE.path}`} />
                }

                {activeSubject &&
                <div className={classes.cardsContainer}>
                    <Grid container spacing={16} alignItems="stretch" direction="column">
                        <Grid item>
                            <OverviewCard subject={activeSubject} />
                        </Grid>
                        <Grid item>
                            <FacultyCard subject={activeSubject} />
                        </Grid>
                    </Grid>
                </div>
                }

                {noSelectedSubject && this.renderSelectSubjectState()}

                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
            </div>
        );
    }
}
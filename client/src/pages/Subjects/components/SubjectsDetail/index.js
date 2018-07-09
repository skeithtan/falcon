import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { makeURL } from "../../../../utils/url.util";
import { FacultyCard } from "../cards/FacultyCard";
import { OverviewCard } from "../cards/OverviewCard";
import { wrap } from "./wrapper";


class BaseSubjectsDetail extends PureComponent {
    renderSelectSubjectState = () => (
        <div className={this.props.classes.selectSubjectState}>
            <Typography variant="headline" className={this.props.classes.selectSubjectText}>
                Select a subject from the left to see the details
            </Typography>
        </div>
    );

    getActiveSubject = subjectId => this.props.subjects.find(subject => subject._id === subjectId);

    render() {
        const {subjectId, isLoading, errors, classes} = this.props;

        const noSelectedSubject = !subjectId;
        const activeSubject = this.getActiveSubject(subjectId);
        const subjectNotFound = !activeSubject && subjectId;

        const subjectNotFoundRedirectURL = makeURL()
            .subjects()
            .build();

        return (
            <div className={classes.subjectsDetail}>
                {subjectNotFound &&
                <Redirect to={subjectNotFoundRedirectURL} />
                }

                {activeSubject &&
                <div className={classes.cardsContainer}>
                    <Grid container spacing={16} alignItems="stretch" direction="column" wrap="nowrap">
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

export const SubjectsDetail = wrap(BaseSubjectsDetail);
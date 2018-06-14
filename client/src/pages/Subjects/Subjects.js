import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { SubjectsDetail } from "./components/SubjectsDetail";
import { SubjectsHeader } from "./components/SubjectsHeader";
import { SubjectsList } from "./components/SubjectsList";


export class SubjectsPage extends Component {
    componentDidMount() {
        const {subjects, isLoading, fetchData} = this.props;
        if (!subjects && !isLoading) {
            fetchData();
        }
    }

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchData}
            message="An error occurred while trying to fetch list of faculties."
            debug={errors[0]}
        />
    );

    render() {
        const {classes, match, isLoading, errors, subjects} = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (!subjects) {
            return null;
        }

        return (
            <div className={classes.subjects}>
                <SubjectsHeader />
                <div className={`${classes.subjectsBody} ${classes.split}`}>
                    <Route path={`${match.url}/:subjectId?`} component={SubjectsList} />
                    <Route path={`${match.url}/:subjectId?`} component={SubjectsDetail} />
                </div>
            </div>
        );
    }
}
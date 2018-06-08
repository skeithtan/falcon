import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { FacultyDetail } from "./components/FacultyDetail";
import { FacultyList } from "./components/FacultyList";
import { FacultyProfilesHeader } from "./components/FacultyProfilesHeader";


export class FacultyProfilesPage extends Component {
    componentDidMount() {
        const {faculties, isLoading, fetchData} = this.props;
        if (!faculties && !isLoading) {
            fetchData();
        }
    }

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState onRetryButtonClick={this.props.fetchData}
                    message="An error occurred while trying to fetch list of faculties."
                    debug={errors[0]}
        />
    );

    render() {
        const {classes, match, isLoading, errors, faculties} = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (!faculties) {
            return null;
        }

        return (
            <div className={classes.facultyProfiles}>
                <Route path={`${match.url}/:facultyId?/:activeTab?`} component={FacultyProfilesHeader} />

                <div className={`${classes.facultyProfilesBody} ${classes.split}`}>
                    <Route path={`${match.url}/:facultyId?/:activeTab?`} component={FacultyList} />
                    <Route path={`${match.url}/:facultyId?/:activeTab?`} component={FacultyDetail} />
                </div>
            </div>
        );
    }
}
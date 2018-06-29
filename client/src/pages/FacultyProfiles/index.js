import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { getObjectForUserType } from "../../utils/user.util";
import { FacultyDetail } from "./components/FacultyDetail";
import { FacultyList } from "./components/FacultyList";
import { FacultyProfilesHeader } from "./components/FacultyProfilesHeader";
import { wrap } from "./wrapper";


class BaseFacultyProfilesPage extends Component {
    componentDidMount() {
        document.title = "Faculty Profiles - Falcon";
        this.fetchFaculties();
        this.fetchChangeRequests();
    }

    fetchFaculties = () => {
        const {
            faculties,
            isLoading,
            fetchAllFaculties,
        } = this.props;
        if (!faculties && !isLoading) {
            fetchAllFaculties();
        }
    };

    fetchChangeRequests = () => {
        const {
            fetchChangeRequests,
            changeRequests: {
                isLoading,
                errors,
                changeRequests,
            },
        } = this.props;

        if (!isLoading && !changeRequests && !errors) {
            fetchChangeRequests();
        }
    };

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState onRetryButtonClick={this.props.fetchAllFaculties}
                    message="An error occurred while trying to fetch list of faculties."
                    debug={errors[0]}
        />
    );

    render() {
        const {
            classes,
            match,
            isLoading,
            errors,
            faculties,
        } = this.props;

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

export const FacultyProfilesPage = wrap(BaseFacultyProfilesPage);
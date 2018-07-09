import Grid from "@material-ui/core/Grid";
import React, { PureComponent } from "react";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { FacultyDetail } from "./components/FacultyDetail";
import { FacultyList } from "./components/FacultyList";
import { FacultyProfilesHeader } from "./components/FacultyProfilesHeader";
import { wrap } from "./wrapper";


class BaseFacultyProfilesPage extends PureComponent {
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
            match: {
                params: {
                    facultyId,
                    activeTab: activeTabPath,
                },
            },
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
                <FacultyProfilesHeader
                    facultyId={facultyId}
                    activeTabPath={activeTabPath}
                />

                <div className={`${classes.facultyProfilesBody} ${classes.split}`}>
                    <FacultyList
                        facultyId={facultyId}
                        activeTabPath={activeTabPath}
                    />
                    <FacultyDetail
                        facultyId={facultyId}
                        activeTabPath={activeTabPath}
                    />
                </div>
            </div>
        );
    }
}

export const FacultyProfilesPage = wrap(BaseFacultyProfilesPage);
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DetailCard } from "../../../../components/DetailCard";
import { FullPageLoadingIndicator } from "../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../components/states/ErrorState";
import { getFullName } from "../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../../index";
import { OVERVIEW_TAB, TABS } from "../faculty_detail_tabs";


function facultyIsFetched(faculty) {
    // Birth date should be present if faculty is fetched
    return Boolean(faculty.birthDate);
}

export class FacultyDetail extends Component {
    renderSelectFacultyState = () => (
        <div className={this.props.classes.selectFacultyState}>
            <Typography variant="headline" className={this.props.classes.selectFacultyText}>
                Select a faculty from the left to see the details
            </Typography>
        </div>
    );

    renderTabs = activeFaculty => {
        const {classes} = this.props;
        return TABS.map(tab => (
            <Route
                key={tab.identifier}
                path={`/${FACULTY_PROFILES_PAGE.path}/${activeFaculty._id}/${tab.path}`}
                render={() => React.createElement(tab.component, {
                    faculty: activeFaculty,
                })} />
        ));
    };

    componentDidMount() {
        this.onNewFacultySelect();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.onNewFacultySelect();
    }

    onNewFacultySelect() {
        const activeFaculty = this.getActiveFaculty();
        this.fetchFacultyDetails(activeFaculty);

        if (activeFaculty) {
            const fullName = getFullName(activeFaculty.user);
            document.title = `${fullName}'s Profile - Faculty Profiles - Falcon`;
        }
    }

    fetchFacultyDetails(activeFaculty) {
        const {getFacultyDetails, setDetailsFetched} = this.props;

        if (!activeFaculty) {
            // There's nothing to fetch when the faculty doesn't exist
            setDetailsFetched();
            return;
        }

        if (!facultyIsFetched(activeFaculty)) {
            getFacultyDetails(activeFaculty)
                .then(() => setDetailsFetched());
        } else {
            setDetailsFetched();
        }
    }

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <div className={this.props.classes.cardsContainer}>
            <DetailCard>
                <ErrorState onRetryButtonClick={() => this.props.getFacultyDetails(this.props.activeFaculty)}
                            message="An error occurred while trying to fetch faculty details."
                            debug={errors[0]} />
            </DetailCard>
        </div>
    );

    getActiveFaculty = () => {
        const {match: {params: {facultyId}}, faculty} = this.props;

        return !facultyId ? null : faculty.faculties.find(faculty =>
            faculty._id === facultyId,
        );
    };

    render() {
        const {match: {params: {facultyId}}, classes, isLoading, errors} = this.props;

        // We don't have a selected faculty if the URL has no facultyID
        const noSelectedFaculty = !facultyId;

        const activeFaculty = this.getActiveFaculty();

        // Faculty is not found when we have a faculty ID in the URL but null is the result of array search
        const facultyNotFound = !activeFaculty && facultyId;

        const isFetched = activeFaculty ? facultyIsFetched(activeFaculty) : false;

        return (
            <div className={classes.facultyDetail}>
                {activeFaculty && isFetched &&
                <Switch>
                    {this.renderTabs(activeFaculty)}
                    <Route render={() => (
                        <Redirect to={`/${FACULTY_PROFILES_PAGE.path}/${activeFaculty._id}/${OVERVIEW_TAB.path}`} />
                    )} />
                </Switch>
                }

                {facultyNotFound &&
                <Redirect to={`/${FACULTY_PROFILES_PAGE.path}`} />
                }

                {noSelectedFaculty && this.renderSelectFacultyState()}

                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
            </div>
        );
    }
}


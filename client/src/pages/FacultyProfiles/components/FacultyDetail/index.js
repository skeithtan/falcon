import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FullPageLoadingIndicator } from "../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../components/states/ErrorState";
import { makeURL } from "../../../../utils/url.util";
import { getFullName } from "../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../../index";
import { TABS } from "../faculty_detail_tabs";
import { wrap } from "./wrapper";


function facultyIsFetched(faculty) {
    // Birth date should be present if faculty is fetched
    return Boolean(faculty.birthDate);
}

class BaseFacultyDetail extends Component {
    state = {
        isLoading: false,
        errors: null,
    };

    renderSelectFacultyState = () => (
        <div className={this.props.classes.selectFacultyState}>
            <Typography variant="headline" className={this.props.classes.selectFacultyText}>
                Select a faculty from the left to see the details
            </Typography>
        </div>
    );

    renderTabs = activeFaculty => TABS.map(tab => (
        <Route
            key={tab.identifier}
            path={`/${FACULTY_PROFILES_PAGE.path}/${activeFaculty._id}/${tab.path}`}
            render={() => React.createElement(tab.component, {
                faculty: activeFaculty,
            })} />
    ));

    componentDidMount() {
        this.onNewFacultySelect(this.props.match.params.facultyId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const oldFacultyId = prevProps.match.params.facultyId;
        const newFacultyId = this.props.match.params.facultyId;

        if (oldFacultyId !== newFacultyId) {
            this.onNewFacultySelect(newFacultyId);
        }
    }

    onNewFacultySelect(facultyId) {
        const activeFaculty = this.getActiveFaculty(facultyId);
        this.fetchFacultyDetails(activeFaculty);

        if (activeFaculty) {
            FacultyDetail.setDocumentTitle(activeFaculty);
        }
    }

    static setDocumentTitle(faculty) {
        const fullName = getFullName(faculty.user);
        document.title = `${fullName}'s Profile - Faculty Profiles - Falcon`;
    }

    fetchFacultyDetails = activeFaculty => {
        const {getFacultyDetails} = this.props;

        if (!activeFaculty) {
            // There's nothing to fetch when the faculty doesn't exist
            this.setState({isLoading: false});
            return;
        }

        if (facultyIsFetched(activeFaculty)) {
            this.setState({isLoading: false});
            return;
        }

        this.setState({
            isLoading: true,
            errors: null,
        });

        getFacultyDetails(activeFaculty)
            .then(() => this.setState({
                isLoading: false,
                errors: null,
            }))
            .catch(error => {
                console.log("An error occurred while fetching faculty details", error);
                this.setState({
                    isLoading: false,
                    errors: [error.message],
                });
            });
    };

    renderLoading = () => (
        <Grid container style={{height: "100%"}}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <div className={this.props.classes.stateContainer}>
            <Card>
                <ErrorState
                    onRetryButtonClick={() => this.componentDidMount()}
                    message="An error occurred while trying to fetch faculty details."
                    debug={errors[0]} />
            </Card>
        </div>
    );

    getActiveFaculty = facultyId => {
        const {faculty: {faculties}} = this.props;
        return !facultyId ? null : faculties.find(faculty => faculty._id === facultyId);
    };

    render() {
        const {match: {params: {facultyId}}, classes} = this.props;
        const {isLoading, errors} = this.state;

        // We don't have a selected faculty if the URL has no facultyID
        const noSelectedFaculty = !facultyId;

        const activeFaculty = this.getActiveFaculty(facultyId);

        // Faculty is not found when we have a faculty ID in the URL but null is the result of array search
        const facultyNotFound = !activeFaculty && facultyId;

        const isFetched = activeFaculty ? facultyIsFetched(activeFaculty) : false;

        const defaultTabURL = makeURL()
            .facultyProfiles()
            .selectFaculty(activeFaculty._id)
            .overview()
            .build();

        const facultyNotFoundRedirectURL = makeURL()
            .facultyProfiles()
            .build();

        return (
            <div className={classes.facultyDetail}>
                {activeFaculty && isFetched &&
                <Switch>
                    {this.renderTabs(activeFaculty)}
                    <Route render={() => (
                        <Redirect to={defaultTabURL} />
                    )} />
                </Switch>
                }

                {facultyNotFound &&
                <Redirect to={facultyNotFoundRedirectURL} />
                }

                {noSelectedFaculty && this.renderSelectFacultyState()}

                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}
            </div>
        );
    }
}

export const FacultyDetail = wrap(BaseFacultyDetail);
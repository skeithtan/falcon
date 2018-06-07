import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DetailCard } from "../../components/DetailCard";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { OVERVIEW_TAB, TABS } from "../FacultyProfiles/components/faculty_detail_tabs";
import { MY_PROFILE } from "../index";
import { MyProfileHeader } from "./components/MyProfileHeader";


export class MyProfilePage extends Component {
    componentDidMount() {
        document.title = "My Profile - Falcon";

        const {profile, fetchData} = this.props;
        if (!profile) {
            fetchData();
        }
    }

    renderTabs = faculty => TABS.map(tab => (
        <Route
            key={tab.identifier}
            path={`/${MY_PROFILE.path}/${tab.path}`}
            render={() => React.createElement(tab.component, {
                faculty: faculty,
            })}
        />
    ));

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

    render() {
        const {classes, profile, isLoading, errors, match} = this.props;
        return (
            <div className={classes.myProfileContainer}>
                <Route path={`${match.url}/:activeTab?`} component={MyProfileHeader} />
                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors)}

                {profile &&
                <div className={classes.myProfileBodyContainer}>
                    <Switch>
                        {this.renderTabs(profile)}
                        <Route render={() => (
                            <Redirect to={`/${MY_PROFILE.path}/${OVERVIEW_TAB.path}`} />
                        )} />
                    </Switch>
                </div>
                }
            </div>
        );
    }
}
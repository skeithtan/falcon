import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { makeURL } from "../../utils/url.util";
import { TABS } from "../FacultyProfiles/components/faculty_detail_tabs";
import { MY_PROFILE_PAGE } from "..";
import { MyProfileHeader } from "./components/MyProfileHeader";
import { wrap } from "./wrapper";


class BaseMyProfilePage extends PureComponent {
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
            path={`/${MY_PROFILE_PAGE.path}/${tab.path}`}
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
        <div className={this.props.classes.stateContainer}>
            <Card>
                <ErrorState
                    onRetryButtonClick={this.props.fetchData}
                    message="An error occurred while trying to fetch faculty details."
                    debug={errors[0]}
                />
            </Card>
        </div>
    );

    render() {
        const {classes, profile, isLoading, errors, match} = this.props;
        const myProfileOverviewURL = makeURL()
            .myProfile()
            .overview()
            .build();

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
                            <Redirect to={myProfileOverviewURL} />
                        )} />
                    </Switch>
                </div>
                }
            </div>
        );
    }
}

export const MyProfilePage = wrap(BaseMyProfilePage);
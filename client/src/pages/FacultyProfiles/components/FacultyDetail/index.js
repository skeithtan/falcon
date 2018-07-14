import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { makeURL } from "../../../../utils/url.util";
import { getFullName } from "../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../..";
import { TABS } from "../faculty_detail_tabs";
import { wrap } from "./wrapper";


class BaseFacultyDetail extends PureComponent {
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
            })} 
            />
    ));

    componentDidMount() {
        this.onNewFacultySelect(this.props.facultyId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const oldFacultyId = prevProps.facultyId;
        const newFacultyId = this.props.facultyId;

        if (oldFacultyId !== newFacultyId) {
            this.onNewFacultySelect(newFacultyId);
        }
    }

    onNewFacultySelect(facultyId) {
        const activeFaculty = this.getActiveFaculty(facultyId);

        if (activeFaculty) {
            FacultyDetail.setDocumentTitle(activeFaculty);
        }
    }

    static setDocumentTitle(faculty) {
        const fullName = getFullName(faculty.user);
        document.title = `${fullName}'s Profile - Faculty Profiles - Falcon`;
    }

    getActiveFaculty = facultyId => {
        const {faculty: {faculties}} = this.props;
        return !facultyId ? null : faculties.find(faculty => faculty._id === facultyId);
    };

    render() {
        const {facultyId, classes} = this.props;

        // We don't have a selected faculty if the URL has no facultyID
        const noSelectedFaculty = !facultyId;

        const activeFaculty = this.getActiveFaculty(facultyId);

        // Faculty is not found when we have a faculty ID in the URL but null is the result of array search
        const facultyNotFound = !activeFaculty && facultyId;

        const defaultTabURL =
            activeFaculty ?
                makeURL()
                    .facultyProfiles()
                    .selectFaculty(facultyId)
                    .overview()
                    .build() :
                makeURL()
                    .facultyProfiles()
                    .build();

        const facultyNotFoundRedirectURL = makeURL()
            .facultyProfiles()
            .build();

        return (
            <div className={classes.facultyDetail}>
                {activeFaculty &&
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
            </div>
        );
    }
}

export const FacultyDetail = wrap(BaseFacultyDetail);
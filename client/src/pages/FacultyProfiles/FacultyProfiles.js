import React, { Component } from "react";

import { FACULTY_PROFILES_PAGE } from "../pages";
import FacultyProfilesHeader from "./components/FacultyProfilesHeader";

export default class FacultyProfilesPage extends Component {
    state = {};

    static getDerivedStateFromProps(nextProps) {
        const {activePageIdentifier, setActivePage} = nextProps;

        if (activePageIdentifier !== FACULTY_PROFILES_PAGE.identifier) {
            setActivePage(FACULTY_PROFILES_PAGE);
        }

        return null;
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.facultyProfiles}>
                <FacultyProfilesHeader classes={classes} />

                <div className={`${classes.facultyProfilesBody} ${classes.split}`}>

                </div>
            </div>
        );
    }
}
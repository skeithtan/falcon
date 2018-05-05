import React, { Component } from "react";

import { FACULTY_PROFILES_PAGE } from "../pages";


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
        //TODO: FacultyProfilesPage
        return <h1>Faculty Profiles</h1>;
    }
}
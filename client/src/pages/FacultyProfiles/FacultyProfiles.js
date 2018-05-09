import React, { Component } from "react";

import FacultyProfilesHeader from "./components/FacultyProfilesHeader";
import FacultyList from "./components/FacultyList";
import FacultyDetail from "./components/FacultyDetail";


export default class FacultyProfilesPage extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.facultyProfiles}>
                <FacultyProfilesHeader classes={classes} />

                <div className={`${classes.facultyProfilesBody} ${classes.split}`}>
                    <FacultyList />
                    <FacultyDetail />
                </div>
            </div>
        );
    }
}
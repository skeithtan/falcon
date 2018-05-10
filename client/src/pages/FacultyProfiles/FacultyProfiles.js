import React, { Component } from "react";
import FacultyDetail from "./components/FacultyDetail";
import FacultyList from "./components/FacultyList";
import FacultyProfilesHeader from "./components/FacultyProfilesHeader";


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
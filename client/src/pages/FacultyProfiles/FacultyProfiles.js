import React, { Component } from "react";
import { FacultyDetail } from "./components/FacultyDetail";
import { FacultyList } from "./components/FacultyList";
import { FacultyProfilesHeader } from "./components/FacultyProfilesHeader";


export class FacultyProfilesPage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.facultyProfiles}>
                <FacultyProfilesHeader/>

                <div className={`${classes.facultyProfilesBody} ${classes.split}`}>
                    <FacultyList />
                    <FacultyDetail />
                </div>
            </div>
        );
    }
}
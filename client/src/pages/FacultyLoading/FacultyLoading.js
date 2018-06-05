import React from "react";
import { Route } from "react-router-dom";
import { FacultyLoadingBody } from "./components/FacultyLoadingBody";
import { FacultyLoadingHeader } from "./components/FacultyLoadingHeader";


export const FacultyLoadingPage = ({match, classes}) => (
    <div className={classes.facultyLoadingContainer}>
        <FacultyLoadingHeader />
        <Route path={`${match.url}/:activeTab?`} component={FacultyLoadingBody} />
    </div>
);
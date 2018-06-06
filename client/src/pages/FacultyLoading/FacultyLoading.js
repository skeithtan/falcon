import React, { PureComponent } from "react";
import { Route } from "react-router-dom";
import { FacultyLoadingBody } from "./components/FacultyLoadingBody";
import { FacultyLoadingHeader } from "./components/FacultyLoadingHeader";


export class FacultyLoadingPage extends PureComponent {
    componentDidMount() {
        document.title = "Faculty Loading - Falcon";
    }

    render() {
        const {match, classes} = this.props;
        return (
            <div className={classes.facultyLoadingContainer}>
                <FacultyLoadingHeader />
                <Route path={`${match.url}/:activeTab?`} component={FacultyLoadingBody} />
            </div>
        );
    }
}
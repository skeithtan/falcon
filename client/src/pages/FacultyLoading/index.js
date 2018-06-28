import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseFacultyLoadingPage extends PureComponent {
    componentDidMount() {
        document.title = "Faculty Loading - Falcon";
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.facultyLoadingContainer}>
                <h1>Hello, Faculty Loading</h1>
            </div>
        );
    }
}

export const FacultyLoadingPage = wrap(BaseFacultyLoadingPage);
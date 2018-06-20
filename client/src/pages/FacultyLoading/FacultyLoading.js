import React, { PureComponent } from "react";


export class FacultyLoadingPage extends PureComponent {
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

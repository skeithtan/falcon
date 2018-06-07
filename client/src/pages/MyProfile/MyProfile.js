import React, { Component } from "react";
import { MyProfileHeader } from "./components/MyProfileHeader";


export class MyProfilePage extends Component {
    componentDidMount() {
        document.title = "My Profile - Falcon";
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.myProfileContainer}>
                <MyProfileHeader />
            </div>
        );
    }
}
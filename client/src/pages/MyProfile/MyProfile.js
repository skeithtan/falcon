import React, {Component} from "react";

export class MyProfilePage extends Component {
    componentDidMount() {
        document.title = "My Profile - Falcon";
    }

    render() {
        return (
            <h1>Hello, MyProfile</h1>
        )
    }
}
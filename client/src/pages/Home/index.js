import React, { Component } from "react";


export class HomePage extends Component {
    componentDidMount() {
        document.title = "Home - Falcon";
    }

    render() {
        //TODO: Home Page
        return <h1>Welcome Home</h1>;
    }
}
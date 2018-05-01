import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import SignInPage from "./pages/SignIn";
import HomePage from "./pages/Home";
import FacultyProfilesPage from "./pages/FacultyProfiles";
import "./App.css";


class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/sign-in" component={SignInPage}/>
                <Route exact path="/" component={HomePage}/>
                <Route path="/faculty-profiles" component={FacultyProfilesPage}/>
            </div>
        );
    }
}

export default withRouter(App);

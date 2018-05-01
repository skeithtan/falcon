import React, { Component } from "react";
import { Route } from "react-router-dom";

import SignInPage from "./pages/SignIn";
import "./App.css";


class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path="/sign-in" component={SignInPage}/>
            </div>
        );
    }
}

export default App;

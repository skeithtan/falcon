import React, { Component } from "react";

import SignInPage from "./pages/SignIn";
import "./App.css";


class App extends Component {
    render() {
        return (
            <div className="App">
                <SignInPage/>
            </div>
        );
    }
}

export default App;

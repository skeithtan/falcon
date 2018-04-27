import React, { Component } from "react";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";

import "./SignIn.css";
import pnuLogo from "../../images/pnu-logo.png";


export default class SignInPage extends Component {
    state = {
        username: "",
        password: "",
        loading: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const formIsFilled = this.state.username.length > 0 &&
            this.state.password.length > 0;

        return (
            <div id="background">
                <Card>
                    {this.state.loading && <LinearProgress/>}
                    <div id="sign-in-box">
                        <img src={pnuLogo} id="sign-in-pnu-logo"/>
                        <Typography id="sign-in-welcome-message" variant="headline" component="h1">
                            Sign in to Falcon
                        </Typography>
                        <Typography component="h2" color="textSecondary">Faculty of Arts and Languages</Typography>

                        <div id="sign-in-form">
                            <TextField id="email-input"
                                       label="Email Address"
                                       value={this.state.username}
                                       onChange={this.handleChange("username")}/>
                            <TextField id="password-input"
                                       label="Password"
                                       type="password"
                                       value={this.state.password}
                                       onChange={this.handleChange("password")}/>
                        </div>

                        <div id="sign-in-button-container">
                            <Button id="sign-in-button"
                                    variant="raised"
                                    color="primary"
                                    disabled={!formIsFilled}>
                                Sign In
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}
import React, { Component } from "react";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import "./SignIn.css";
import pnuLogo from "../../images/pnu-logo.png";


export default class SignInPage extends Component {
    render() {
        return (
            <div id="background">
                <Card id="sign-in-box">
                    <img src={pnuLogo} id="sign-in-pnu-logo"/>
                    <Typography id="sign-in-welcome-message" variant="headline" component="h1">
                        Sign in to Falcon
                    </Typography>
                    <Typography component="h2" color="textSecondary">Faculty of Arts and Languages</Typography>

                    <div id="sign-in-form">
                        <TextField id="email-input" label="Email Address"/>
                        <TextField id="password-input" label="Password" type="password"/>
                    </div>

                    <div id="sign-in-button-container">
                        <Button id="sign-in-button" variant="raised" color="primary">
                            Sign In
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}
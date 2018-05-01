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
        email: "",
        password: "",
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.attemptSignIn(this.state.email, this.state.password);
    };

    render() {
        const formIsFilled = this.state.email.length > 0 &&
            this.state.password.length > 0;

        const {attemptingSignIn, signInError} = this.props;

        return (
            <div id="background">
                <Card>
                    {attemptingSignIn && <LinearProgress />}
                    <div id="sign-in-box">
                        <img src={pnuLogo} id="sign-in-pnu-logo" alt="PNU Logo" />
                        <Typography id="sign-in-welcome-message" variant="headline" component="h1">
                            Sign in to Falcon
                        </Typography>
                        <Typography component="h2" color="textSecondary">Faculty of Arts and Languages</Typography>

                        <form onSubmit={this.onSubmit}>

                            <div id="sign-in-form">
                                {signInError !== null &&
                                <Typography color="error">{signInError}</Typography>
                                }

                                <TextField id="email-input"
                                           label="Email Address"
                                           value={this.state.email}
                                           onChange={this.handleChange("email")} />
                                <TextField id="password-input"
                                           label="Password"
                                           type="password"
                                           value={this.state.password}
                                           onChange={this.handleChange("password")} />
                            </div>

                            <div id="sign-in-button-container">
                                <Button id="sign-in-button"
                                        type="submit"
                                        variant="raised"
                                        color="primary"
                                        disabled={!formIsFilled || this.props.attemptingSignIn}>
                                    Sign In
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        );
    }
}
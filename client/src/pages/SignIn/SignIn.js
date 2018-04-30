import React, { Component } from "react";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";

import userService from "../../services/user.service";
import "./SignIn.css";
import pnuLogo from "../../images/pnu-logo.png";


export default class SignInPage extends Component {
    state = {
        email: "",
        password: "",
        loading: false,
        error: null,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onSubmit = event => {
        event.preventDefault();

        this.setState({
            loading: true,
            error: null,
        });

        userService.signIn(this.state.email, this.state.password)
            .then(user => {
                this.props.onSignInSuccess(user);
                //TODO: Exit sign in page
            })
            .catch(error => {
                console.log(error);

                if (error.networkError) {
                    this.setState({
                        error: "A network error has occurred",
                        loading: false,
                    });

                    return;
                }

                //The only error the server could possibly throw is if the credentials are invalid
                if (error.graphQLErrors.length > 0) {
                    this.setState({
                        error: "Invalid credentials",
                        loading: false,
                    });

                    return;
                }


                this.setState({
                    error: "An unknown error occurred",
                    loading: false,
                });

            });
    };

    render() {
        const formIsFilled = this.state.email.length > 0 &&
            this.state.password.length > 0;

        return (
            <div id="background">
                <Card>
                    {this.state.loading && <LinearProgress/>}
                    <div id="sign-in-box">
                        <img src={pnuLogo} id="sign-in-pnu-logo" alt="PNU Logo"/>
                        <Typography id="sign-in-welcome-message" variant="headline" component="h1">
                            Sign in to Falcon
                        </Typography>
                        <Typography component="h2" color="textSecondary">Faculty of Arts and Languages</Typography>

                        <form onSubmit={this.onSubmit}>

                            <div id="sign-in-form">
                                {this.state.error !== null &&
                                <Typography color="error">{this.state.error}</Typography>
                                }

                                <TextField id="email-input"
                                           label="Email Address"
                                           value={this.state.email}
                                           onChange={this.handleChange("email")}/>
                                <TextField id="password-input"
                                           label="Password"
                                           type="password"
                                           value={this.state.password}
                                           onChange={this.handleChange("password")}/>
                            </div>

                            <div id="sign-in-button-container">
                                <Button id="sign-in-button"
                                        type="submit"
                                        variant="raised"
                                        color="primary"
                                        disabled={!formIsFilled || this.state.loading}>
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
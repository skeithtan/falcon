import React, { Component } from "react";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";

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

        const {isLoading, signInError, classes} = this.props;

        return (
            <div className={classes.background}>
                <Card>
                    {isLoading && <LinearProgress />}
                    <div className={classes.signInBox}>
                        <img src={pnuLogo} className={classes.pnuLogo} alt="PNU Logo" />
                        <Typography className={classes.welcomeMessage} variant="headline" component="h1">
                            Sign in to Falcon
                        </Typography>
                        <Typography component="h2" color="textSecondary">Faculty of Arts and Languages</Typography>

                        <form onSubmit={this.onSubmit}>

                            <div className={classes.form}>
                                {signInError !== null &&
                                <Typography color="error">{signInError}</Typography>
                                }

                                <TextField className={classes.formInput}
                                           label="Email Address"
                                           fullWidth={true}
                                           value={this.state.email}
                                           onChange={this.handleChange("email")} />
                                <TextField className={classes.formInput}
                                           label="Password"
                                           fullWidth={true}
                                           type="password"
                                           value={this.state.password}
                                           onChange={this.handleChange("password")} />
                            </div>

                            <div className={classes.buttonContainer}>
                                <Button className={classes.button}
                                        type="submit"
                                        variant="raised"
                                        color="primary"
                                        disabled={!formIsFilled || this.props.isLoading}>
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
import React, { Component } from "react";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";

import style from "./SignIn.css";
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

        console.log(style);

        return (
            <div className={style.background}>
                <Card>
                    {attemptingSignIn && <LinearProgress />}
                    <div className={style.signInBox}>
                        <img src={pnuLogo} className={style.pnuLogo} alt="PNU Logo" />
                        <Typography className={style.welcomeMessage} variant="headline" component="h1">
                            Sign in to Falcon
                        </Typography>
                        <Typography component="h2" color="textSecondary">Faculty of Arts and Languages</Typography>

                        <form onSubmit={this.onSubmit}>

                            <div className={style.form}>
                                {signInError !== null &&
                                <Typography color="error">{signInError}</Typography>
                                }

                                <TextField className={style.formInput}
                                           label="Email Address"
                                           value={this.state.email}
                                           onChange={this.handleChange("email")} />
                                <TextField className={style.formInput}
                                           label="Password"
                                           type="password"
                                           value={this.state.password}
                                           onChange={this.handleChange("password")} />
                            </div>

                            <div className={style.buttonContainer}>
                                <Button className={style.button}
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
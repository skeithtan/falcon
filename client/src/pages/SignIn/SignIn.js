import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import pnuLogo from "../../images/pnu-logo.png";
import { PasswordSetupCard } from "./components/PasswordSetupCard";


export class SignInPage extends Component {
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

    renderSignInCard = () => {
        const {isLoading, signInError, classes} = this.props;
        const {email, password} = this.state;
        const formIsFilled = email.length > 0 && password.length > 0;

        return (
            <Card>
                {isLoading && <LinearProgress />}
                <div className={classes.signInBox}>
                    <img src={pnuLogo} className={classes.cardImage} alt="PNU Logo" />
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
                                       value={email}
                                       onChange={this.handleChange("email")} />
                            <TextField className={classes.formInput}
                                       label="Password"
                                       fullWidth={true}
                                       type="password"
                                       value={password}
                                       onChange={this.handleChange("password")} />
                        </div>

                        <div className={classes.buttonContainer}>
                            <Button className={classes.button}
                                    type="submit"
                                    variant="raised"
                                    color="primary"
                                    disabled={!formIsFilled || isLoading}>
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        );
    };

    render() {
        const {classes, user} = this.props;

        return (
            <div className={classes.background}>
                {!user && this.renderSignInCard()}

                {user !== null &&
                <PasswordSetupCard
                    classes={classes}
                    user={user}
                />
                }
            </div>
        );
    }
}
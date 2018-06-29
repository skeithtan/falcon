import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import pnuLogo from "../../images/pnu-logo.png";
import { PasswordSetupCard } from "./components/PasswordSetupCard";
import { wrap } from "./wrapper";


class BaseSignInPage extends Component {
    componentDidMount() {
        document.title = "Sign In - Falcon";
    }

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
                    <Grid container spacing={24} direction="column">
                        <Grid item>
                            <img src={pnuLogo} className={classes.cardImage} alt="PNU Logo" />
                        </Grid>
                        <Grid item>
                            <Typography variant="headline" color="primary">
                                Sign in to Falcon
                            </Typography>
                            <Typography variant="subheading" color="textSecondary">
                                Faculty of Arts and Languages
                            </Typography>
                        </Grid>

                        <Grid item>
                            <form onSubmit={this.onSubmit}>

                                <div className={classes.form}>
                                    {signInError !== null &&
                                    <Typography color="error">{signInError}</Typography>
                                    }

                                    <TextField
                                        className={classes.formInput}
                                        label="Email Address"
                                        fullWidth={true}
                                        value={email}
                                        autoComplete="email"
                                        onChange={this.handleChange("email")}
                                    />
                                    <TextField
                                        className={classes.formInput}
                                        label="Password"
                                        fullWidth={true}
                                        type="password"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={this.handleChange("password")}
                                    />
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
                        </Grid>
                    </Grid>
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

export const SignInPage = wrap(BaseSignInPage);
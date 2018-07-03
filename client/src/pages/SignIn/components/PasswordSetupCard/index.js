import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SecurityIcon from "@material-ui/icons/Security";
import React, { Component } from "react";
import { getFullName } from "../../../../utils/user.util";
import { ChangePasswordModal } from "../../../App/components/ChangePasswordModal";


export class PasswordSetupCard extends Component {
    state = {
        changePasswordModalIsShowing: false,
    };

    toggleChangePasswordModal = shouldShow => this.setState({
        changePasswordModalIsShowing: shouldShow,
    });

    render() {
        const {user, classes} = this.props;
        const {changePasswordModalIsShowing} = this.state;
        const fullName = getFullName(user);

        return (
            <Card className={classes.signInBox}>
                <Grid container spacing={32} direction="column">
                    <Grid item>
                        <Typography className={classes.falconLogo} color="textSecondary">
                            Falcon
                        </Typography>
                    </Grid>

                    <Grid item>
                        <SecurityIcon className={classes.cardImage} color="primary" />
                    </Grid>

                    <Grid item>
                        <Typography variant="headline" color="primary">
                            Hello, {fullName}!
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography color="textSecondary">
                            Your password <strong>was marked as a temporary password</strong>. For security reasons,
                            we need you to set a new password.
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="raised"
                            color="primary"
                            onClick={() => this.toggleChangePasswordModal(true)}
                        >
                            Set my password
                        </Button>
                    </Grid>
                </Grid>

                <ChangePasswordModal
                    open={changePasswordModalIsShowing}
                    onClose={() => this.toggleChangePasswordModal(false)}
                />
            </Card>
        );
    }
}
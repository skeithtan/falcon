import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/es/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { wrap } from "./wrapper";


class BaseModalFormDialogActions extends Component {
    renderSubmitting = () => (
        <Grid item>
            <Grid container spacing={8} alignItems="center" wrap="nowrap">
                <Grid item>
                    <CircularProgress size={24} />
                </Grid>
                <Grid item>
                    <Typography color="primary">Submitting...</Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    renderError = error => (
        <Grid item>
            <Typography color="error">{error}</Typography>
        </Grid>
    );

    renderKeepForm = () => (
        <FormControlLabel
            control={
                <Checkbox
                    checked={this.props.keepForm}
                    onChange={this.props.handleKeepFormChange}
                    color="primary"
                />
            }
            label="Keep form after submission"
        />
    );

    render() {
        const {
            isSubmitting,
            error,
            handleSubmit,
            buttonName,
            disabled,
            classes,
            showKeepForm,
        } = this.props;

        return (
            <Grid
                container
                justify="space-between"
                alignItems="center"
                className={classes.container}
            >
                <Grid item>
                    {showKeepForm && this.renderKeepForm()}
                </Grid>

                <Grid item>
                    <Grid container spacing={8} alignItems="center" wrap="nowrap">
                        {isSubmitting && this.renderSubmitting()}
                        {error && this.renderError(error)}
                        <Grid item>
                            <Button color="primary" disabled={isSubmitting || disabled}
                                    onClick={handleSubmit}>{buttonName}</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

export const ModalFormDialogActions = wrap(BaseModalFormDialogActions);
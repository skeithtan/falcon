import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseModalFormDialogActions extends PureComponent {
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
                wrap="nowrap"
            >
                <Grid item>
                    {showKeepForm && this.renderKeepForm()}
                </Grid>

                <Grid item md={true}>
                    <Grid container spacing={8} alignItems="center" justify="flex-end" wrap="nowrap">
                        {isSubmitting && this.renderSubmitting()}
                        {error && this.renderError(error)}
                        <Grid item>
                            <Button
                                color="primary"
                                disabled={isSubmitting || disabled}
                                onClick={handleSubmit}>
                                {buttonName}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

export const ModalFormDialogActions = wrap(BaseModalFormDialogActions);
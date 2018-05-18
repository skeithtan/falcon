import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/es/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";


export default class ModalFormDialogActions extends Component {

    render() {
        const {
            isSubmitting,
            error,
            handleSubmit,
            buttonName,
            disabled,
            classes,
            keepForm,
            handleKeepFormChange,
            showKeepForm,
        } = this.props;

        return (
            <Grid container justify="space-between" alignItems="center" className={classes.container}>

                <Grid item>

                    {showKeepForm &&
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={keepForm}
                                onChange={handleKeepFormChange}
                                color="primary"
                            />
                        }
                        label="Keep form after submission"
                    />
                    }
                </Grid>

                <Grid item>
                    <Grid container spacing={8} alignItems="center">
                        {isSubmitting &&
                        <Grid item>
                            <CircularProgress size={24} />
                        </Grid>
                        }

                        {isSubmitting &&
                        <Grid item>
                            <Typography color="primary">Submitting...</Typography>
                        </Grid>
                        }

                        {error &&
                        <Grid item>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                        }

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
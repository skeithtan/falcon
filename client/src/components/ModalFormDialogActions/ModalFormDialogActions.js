import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/es/Grid";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";


export default class ModalFormDialogActions extends Component {
    render() {
        const {isSubmitting, error, handleSubmit, buttonName, disabled} = this.props;
        return (
            <DialogActions>
                <div>
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
                    </Grid>
                </div>
                <Button color="primary" disabled={isSubmitting || disabled} onClick={handleSubmit}>{buttonName}</Button>
            </DialogActions>
        );
    }
}
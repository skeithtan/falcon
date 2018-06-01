import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { FACULTY_PROFILES_PAGE } from "../../../../index";
import { OVERVIEW_TAB } from "../../faculty_detail_tabs";
import { FacultyForm, ReviewForm, UserForm } from "./steps";


const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: null,
    sex: SEX.M.identifier,
    employment: EMPLOYMENT.FULL_TIME_PERMANENT.identifier,
    birthDate: "",
};

const initialState = {
    activeStep: 0,
    form: {...initialForm},
    isSubmitting: false,
    error: null,
};

export class AddFacultyModal extends Component {
    state = {...initialState};

    resetForm = () => this.setState({...initialState, form: {...initialForm}});

    handleBack = () => this.setState({
        activeStep: this.state.activeStep - 1,
    });

    handleNext = () => this.setState({
        activeStep: this.state.activeStep + 1,
    });

    handleFinish = () => {
        this.setState({
            isSubmitting: true,
            error: null,
        });

        this.props.submitForm(this.state.form)
            .then(faculty => {
                this.setState({isSubmitting: false}, this.closeModal);
                this.props.history.push(`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/${OVERVIEW_TAB.path}`);
            })
            .catch(error => {
                console.log("An error occurred while adding faculty", error);
                if (error.graphQLErrors &&
                    error.graphQLErrors[0].message.startsWith("ValidationError: User with email")) {
                    this.setState({
                        error: `User with email ${this.state.form.email} already exists.`,
                        isSubmitting: false,
                    });
                } else {
                    this.setState({
                        error: "An error occurred",
                        isSubmitting: false,
                    });
                }
            });
    };

    closeModal = () => {
        if (this.state.isSubmitting) {
            // You can't exit while the form is submitting!
            return;
        }

        this.props.onClose();
        this.resetForm();
    };

    handleFormChange = fieldName => event => {
        const form = {...this.state.form};
        form[fieldName] = event.target.value;
        this.setState({form: form});
    };

    getSteps = () => [
        <Step key={0}>
            <StepLabel>Create a user</StepLabel>
            <StepContent>
                <div className={this.props.classes.form}>
                    <UserForm handleFormChange={this.handleFormChange} form={this.state.form}
                              handleNext={this.handleNext} />
                </div>
            </StepContent>
        </Step>,
        <Step key={1}>
            <StepLabel>Set faculty details</StepLabel>
            <StepContent>
                <div className={this.props.classes.form}>
                    <FacultyForm handleFormChange={this.handleFormChange} form={this.state.form}
                                 handleNext={this.handleNext} handleBack={this.handleBack} />
                </div>
            </StepContent>
        </Step>,
        <Step key={2}>
            <StepLabel>Review details</StepLabel>
            <StepContent>
                <div className={this.props.classes.form}>
                    <ReviewForm form={this.state.form} classes={this.props.classes} />
                </div>

                <Grid container key={3} spacing={16} alignItems="center">
                    <Grid item>
                        <Button
                            disabled={this.state.isSubmitting}
                            onClick={this.handleBack}
                            className={this.props.classes.backButton}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={this.state.isSubmitting}
                            variant="raised"
                            color="primary"
                            onClick={this.handleFinish}>
                            Finish
                        </Button>
                    </Grid>

                    {this.state.isSubmitting &&
                    <Grid item>
                        <CircularProgress size={24} />
                    </Grid>
                    }

                    {this.state.isSubmitting &&
                    <Grid item>
                        <Typography color="primary">Submitting...</Typography>
                    </Grid>
                    }

                    {this.state.error &&
                    <Grid item>
                        <Typography color="error">{String(this.state.error)}</Typography>
                    </Grid>
                    }
                </Grid>

            </StepContent>
        </Step>,
    ];

    render() {
        const {open, classes} = this.props;
        const {activeStep} = this.state;

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>Add a Faculty</DialogTitle>
                <DialogContent className={classes.container}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {this.getSteps()}
                    </Stepper>
                </DialogContent>
            </Dialog>
        );
    }
}
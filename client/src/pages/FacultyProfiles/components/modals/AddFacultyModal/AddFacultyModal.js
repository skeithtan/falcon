import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React, { Component } from "react";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { FacultyForm, ReviewForm, UserForm } from "./steps";


function mapFormToGraphQLParameters(form) {
    return {
        user: {
            name: {
                first: form.firstName,
                last: form.lastName,
            },
            email: form.email,
        },
        password: form.password,
        faculty: {
            sex: form.sex,
            employment: form.employment,
            birthDate: form.birthDate,
        },
    };
}

const initialState = {
    activeStep: 0,
    form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        sex: SEX.M,
        employment: EMPLOYMENT.FULL_TIME_PERMANENT,
        birthDate: "",
    },
    isSubmitting: false,
};

export default class AddFacultyModal extends Component {
    state = {...initialState};

    resetForm = () => this.setState({...initialState});

    handleBack = () => this.setState({
        activeStep: this.state.activeStep - 1,
    });

    handleNext = () => this.setState({
        activeStep: this.state.activeStep + 1,
    });

    handleFinish = () => {
        //TODO
        console.log("Handle Finish called");
    };

    handleFormChange = fieldName => event => {
        const form = this.state.form;
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
        <Step key={1}>
            <StepLabel>Review details</StepLabel>
            <StepContent>
                <div className={this.props.classes.form}>
                    <ReviewForm form={this.state.form} classes={this.props.classes}/>
                </div>

                <Button
                    onClick={this.handleBack}
                    className={this.props.classes.backButton}>
                    Back
                </Button>

                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleFinish}>
                    Finish
                </Button>

            </StepContent>
        </Step>,
    ];

    render() {
        const {open, onClose, classes} = this.props;
        const {activeStep} = this.state;

        return (
            <Dialog open={open} onClose={onClose} maxWidth={false}>
                <DialogTitle>Add a Faculty</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {this.getSteps()}
                    </Stepper>
                </DialogContent>
            </Dialog>
        );
    }
}
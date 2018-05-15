import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React, { Component } from "react";
import steps from "./steps";


const initialState = {
    activeStep: 0,
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

    getSteps = () => steps.map((step, index) => (
        <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
                {step.component}

                <Button
                    disabled={index === 0}
                    onClick={this.handleBack}
                    className={this.props.classes.backButton}>
                    Back
                </Button>


                {index === steps.length - 1 &&
                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleFinish}>
                    Finish
                </Button>
                }

                {index < steps.length - 1 &&
                <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleNext}>
                    Next
                </Button>
                }

            </StepContent>
        </Step>
    ));

    render() {
        const {open, onClose} = this.props;
        const {activeStep} = this.state;

        return (
            <Dialog open={open} onClose={onClose}>
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
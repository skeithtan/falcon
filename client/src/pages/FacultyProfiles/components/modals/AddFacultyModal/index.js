import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React, { Fragment } from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { ModalFormDialogActions } from "../../../../../components/ModalFormDialogActions";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { makeURL } from "../../../../../utils/url.util";
import { generateTemporaryPassword } from "../../../../../utils/user.util";
import { FacultyForm, ReviewForm, UserForm } from "./steps";
import { wrap } from "./wrapper";


class BaseAddFacultyModal extends ModalFormComponent {
    get initialState() {
        return {
            activeStep: 0,
            form: {...this.initialForm},
            isSubmitting: false,
            error: null,
        };
    }

    get initialForm() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: generateTemporaryPassword(),
            photo: null,
            sex: SEX.M.identifier,
            employment: EMPLOYMENT.REGULAR.identifier,
            birthDate: "",
            idNumber: "",
        };
    }

    handleBack = () => this.setState({
        activeStep: this.state.activeStep - 1,
    });

    handleNext = () => this.setState({
        activeStep: this.state.activeStep + 1,
    });

    get submitAddAction() {
        const {submitForm, history} = this.props;

        return () => submitForm(this.state.form)
            .then(faculty => {
                const overviewTabURL = makeURL()
                    .facultyProfiles()
                    .selectFaculty(faculty._id)
                    .overview()
                    .build();

                history.push(overviewTabURL);
                return faculty;
            });
    }

    get buttonName() {
        return "Finish";
    }

    get toastSuccessMessage() {
        return "Faculty successfully added";
    }

    get modalTitle() {
        return "Add a Faculty";
    }

    get steps() {
        const {classes} = this.props;
        const {isSubmitting, form} = this.state;

        return [
            {
                label: "Create a user",
                content: (
                    <UserForm
                        handleFormChange={this.handleFormChange}
                        form={form}
                        handleNext={this.handleNext}
                    />
                ),
            },
            {
                label: "Set faculty details",
                content: (
                    <FacultyForm
                        handleFormChange={this.handleFormChange}
                        form={form}
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                    />
                ),
            },
            {
                label: "Review details",
                content: (
                    <Fragment>
                        <ReviewForm form={form} classes={classes} />
                        <Button
                            variant="outlined"
                            disabled={isSubmitting}
                            onClick={this.handleBack}
                            className={classes.backButton}>
                            Change details
                        </Button>
                        <ModalFormDialogActions
                            isSubmitting={this.state.isSubmitting}
                            error={this.state.error}
                            showKeepForm={this.props.action === "add"}
                            keepForm={this.state.keepForm}
                            handleKeepFormChange={this.handleKeepFormChange}
                            disabled={this.dialogActionIsDisabled}
                            handleSubmit={this.handleSubmit}
                            buttonName={this.buttonName}
                        />
                    </Fragment>
                ),
            },
        ];
    }

    // No actions here
    renderDialogActions = () => null;

    renderDialogContent = () => {
        const {activeStep} = this.state;
        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {this.steps.map(step => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                <div className={this.props.classes.form}>
                                    {step.content}
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    };
}

export const AddFacultyModal = wrap(BaseAddFacultyModal);
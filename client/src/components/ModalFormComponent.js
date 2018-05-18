import React, { Component } from "react";
import ModalFormDialogActions from "./ModalFormDialogActions";


export default class ModalFormComponent extends Component {
    state = {...this.initialState};

    // To be implemented by subclass
    get initialForm() {
        return {};
    };

    get initialState() {
        return {
            form: {...this.initialForm},
            isSubmitting: false,
            error: null,
            keepForm: false,
        };
    };

    closeModal = () => {
        if (this.state.isSubmitting) {
            return;
        }

        this.props.onClose();
        this.resetForm();
    };

    onSubmitSuccess = () => {
        this.resetForm();

        if (!this.state.keepForm) {
            this.props.onClose();
        } else {
            // If keepForm is true, do not turn false unless user says so
            this.setState({keepForm: true});
        }
    };

    resetForm = () => this.setState({...this.initialState});

    handleFormChange = fieldName => event => {
        const form = {...this.state.form};
        form[fieldName] = event.target.value;
        this.setState({
            form: {
                ...form,
            },
        });
    };

    handleKeepFormChange = event => this.setState({
        keepForm: event.target.checked,
    });

    renderModalFormDialogActions = disabled => (
        <ModalFormDialogActions
            isSubmitting={this.state.isSubmitting}
            error={this.state.error}
            showKeepForm={this.props.action === "add"}
            keepForm={this.state.keepForm}
            handleKeepFormChange={this.handleKeepFormChange}
            disabled={disabled}
            handleSubmit={this.handleSubmit}
            buttonName={this.buttonName}
        />
    );

    // To be implemented by subclass
    get submitAddAction() {

    }

    // To be implemented by subclass
    get submitUpdateAction() {

    }

    handleSubmit = () => {
        this.setState({isSubmitting: true, error: null});
        const action = this.props.action;
        const submit = action === "add" ? this.submitAddAction : this.submitUpdateAction;

        submit()
            .then(() => this.setState({isSubmitting: false}, this.onSubmitSuccess))
            .catch(error => {
                console.log("An error occurred while submitting form", error);
                this.setState({
                    isSubmitting: false,
                    error: "An error occurred",
                });
            });
    };
}
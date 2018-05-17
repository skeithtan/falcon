import { Component } from "react";


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
        }
    };

    closeModal = () => {
        if (this.state.isSubmitting) {
            return;
        }

        this.props.onClose();
        this.resetForm();
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

    // To be implemented by subclass
    get submitAddAction() {

    }

    // To be implemented by subclass
    get submitUpdateAction() {

    }

    handleSubmit = () => {
        this.setState({isSubmitting: true, error: null});
        const action = this.props;
        const submit = action === "add" ? this.submitAddAction : this.submitUpdateAction;

        submit()
            .then(() => this.setState({isSubmitting: false}, this.closeModal))
            .catch(error => {
                console.log("An error occurred while submitting form", error);
                this.setState({
                    isSubmitting: false,
                    error: "An error occurred",
                });
            });
    }
}
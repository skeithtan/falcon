import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ModalFormComponent } from "../../../../../../../components/ModalFormComponent";
import { validateForm } from "../../../../../../../utils/forms.util";
import { wrap } from "./wrapper";


class BaseRejectChangeRequestModal extends ModalFormComponent {
    mapPropsToForm = () => this.initialForm;

    get initialForm() {
        return {
            rejectionReason: "",
        };
    }

    get submitUpdateAction() {
        const form = this.state.form;
        const {rejectChangeRequest} = this.props;
        return () => rejectChangeRequest(form.rejectionReason);
    }

    get buttonName() {
        return "Reject Change Request";
    }

    get modalTitle() {
        return "Reject Change Request";
    }

    get formErrors() {
        return validateForm({
            rejectionReason: {
                value: this.state.form.rejectionReason,
            },
        });
    }

    get dialogActionIsDisabled() {
        return this.formErrors.hasErrors;
    }

    renderDialogContent = () => {
        const {classes} = this.props;
        const {form, isSubmitting} = this.state;
        const {fieldErrors} = this.formErrors;

        return (
            <div className={`${classes.container} ${classes.form}`}>
                <FormControl error={fieldErrors.rejectionReason.length > 0} fullWidth>
                    <TextField
                        error={fieldErrors.rejectionReason.length > 0}
                        label="Rejection Reason"
                        disabled={isSubmitting}
                        onChange={this.handleFormChange("rejectionReason")}
                        value={form.rejectionReason}
                    />
                    {fieldErrors.rejectionReason.length > 0 &&
                    <FormHelperText>{fieldErrors.rejectionReason[0]}</FormHelperText>
                    }
                </FormControl>
            </div>
        );
    };
}

export const RejectChangeRequestModal = wrap(BaseRejectChangeRequestModal);
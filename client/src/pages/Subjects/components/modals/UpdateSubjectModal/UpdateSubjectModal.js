import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { validateForm } from "../../../../../utils/forms.util";


function getFormErrors(form) {
    return validateForm({
        name: {
            value: form.name,
        },
        code: {
            value: form.code,
        },
    });
}

export class UpdateSubjectModal extends ModalFormComponent {
    get initialForm() {
        return {
            name: "",
            code: "",
        };
    }

    mapPropsToForm = ({subject}) => ({
        name: subject.name,
        code: subject.code,
    });

    get submitUpdateAction() {
        const {subject, submitUpdateSubject} = this.props;
        const {form} = this.state;
        return () => submitUpdateSubject(subject, form);
    }

    get buttonName() {
        return "Update Subject";
    }

    get modalTitle() {
        return "Update Subject";
    }

    render() {
        const {open, classes} = this.props;
        const {form, isSubmitting} = this.state;
        const {hasErrors, fieldErrors} = getFormErrors(form);

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>{this.modalTitle}</DialogTitle>
                <DialogContent className={classes.container}>
                    <Grid
                        container
                        className={classes.form}
                        spacing={24}
                        direction="column">

                        <Grid item>
                            <FormControl error={fieldErrors.name.length > 0} fullWidth>
                                <TextField
                                    error={fieldErrors.name.length > 0}
                                    label="Subject Name"
                                    disabled={isSubmitting}
                                    onChange={this.handleFormChange("name")}
                                    value={form.name}
                                />
                                {fieldErrors.name.length > 0 &&
                                <FormHelperText>{fieldErrors.name[0]}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl error={fieldErrors.code.length > 0} fullWidth>
                                <TextField
                                    error={fieldErrors.code.length > 0}
                                    label="Subject Code"
                                    disabled={isSubmitting}
                                    onChange={this.handleFormChange("code")}
                                    value={form.code}
                                />
                                {fieldErrors.code.length > 0 &&
                                <FormHelperText>{fieldErrors.code[0]}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>

                    </Grid>
                </DialogContent>

                {this.renderModalFormDialogActions(hasErrors)}
            </Dialog>
        );
    }
}
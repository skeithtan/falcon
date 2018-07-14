import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { FacultyChip } from "../../../../../components/FacultyChip";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { SUBJECT_CATEGORIES } from "../../../../../enums/class.enums";
import { validateForm } from "../../../../../utils/forms.util";
import { getFullName } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";
import { makeURL } from "../../../../../utils/url.util";


function getFormErrors(form) {
    return validateForm({
        name: {
            value: form.name,
        },
        code: {
            value: form.code,
        },
        description: {
            value: form.description,
        },
    });
}

class BaseAddSubjectModal extends ModalFormComponent {
    get initialForm() {
        return {
            name: "",
            code: "",
            description: "",
            category: "PEDAGOGICAL",
            faculties: [],
        };
    }

    get submitAddAction() {
        const {form} = this.state;
        const {submitAddSubject, history} = this.props;
        return () => submitAddSubject(form)
            .then(newSubject => {
                const url = makeURL()
                    .subjects()
                    .selectSubject(newSubject._id)
                    .build();

                history.push(url);
                return newSubject;
            });
    }

    get buttonName() {
        return "Add Subject";
    }

    get modalTitle() {
        return "Add a Subject";
    }

    get toastSuccessMessage() {
        return "Subject successfully added";
    }

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchData}
            message="An error occurred while trying to fetch list of faculties"
            debug={errors[0]}
        />
    );

    renderLoadingIndicator = () => (
        <FullPageLoadingIndicator size={100} />
    );

    getFacultyFromId = _id => this.props.faculties.find(faculty => faculty._id === _id);

    renderFacultyChips = facultyIds => (
        <Grid container spacing={8}>
            {facultyIds.map(facultyId =>
                <Grid item key={facultyId}>
                    <FacultyChip faculty={this.getFacultyFromId(facultyId)} />
                </Grid>,
            )}
        </Grid>
    );

    renderMenuItems = faculties => faculties.map(faculty => {
        const selected = this.state.form.faculties.includes(faculty._id);
        const className = selected ? this.props.classes.selectedFaculty : "";

        return (
            <MenuItem
                key={faculty._id}
                value={faculty._id}
                className={className}
            >
                {getFullName(faculty.user)}
            </MenuItem>
        );
    });

    get formErrors() {
        return getFormErrors(this.state.form);
    };

    get dialogActionIsDisabled() {
        return this.formErrors.hasErrors;
    }

    renderDialogContent = () => {
        const {classes, faculties, isLoading, errors} = this.props;
        const {form, isSubmitting} = this.state;
        const {fieldErrors} = this.formErrors;

        return (
            <div className={classes.container}>
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

                    <Grid item>
                        <FormControl error={fieldErrors.description.length > 0} fullWidth>
                            <TextField
                                error={fieldErrors.description.length > 0}
                                label="Description"
                                disabled={isSubmitting}
                                onChange={this.handleFormChange("description")}
                                value={form.description}
                            />
                            {fieldErrors.description.length > 0 &&
                            <FormHelperText>{fieldErrors.description[0]}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <RadioGroup value={form.category} onChange={this.handleFormChange("category")}>
                                {Object.entries(SUBJECT_CATEGORIES).map(([identifier, {name}]) =>
                                    <FormControlLabel
                                        key={identifier}
                                        value={identifier}
                                        label={name}
                                        disabled={isSubmitting}
                                        control={<Radio />}
                                    />,
                                )}
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item>

                        {isLoading && this.renderLoadingIndicator()}
                        {errors && this.renderErrors(errors)}
                        {faculties &&

                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel>Faculties that can teach this subject</InputLabel>
                            <Select
                                disabled={isSubmitting}
                                multiple
                                value={this.state.form.faculties}
                                onChange={this.handleFormChange("faculties")}
                                input={<Input />}
                                renderValue={this.renderFacultyChips}
                            >
                                {this.renderMenuItems(faculties)}
                            </Select>
                        </FormControl>

                        }
                    </Grid>

                </Grid>
            </div>
        );
    };
}

export const AddSubjectModal = wrap(BaseAddSubjectModal);
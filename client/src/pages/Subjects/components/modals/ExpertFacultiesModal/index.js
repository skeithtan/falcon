import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { FacultyChip } from "../../../../../components/FacultyChip";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { getFullName } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";


class BaseExpertFacultiesModal extends ModalFormComponent {
    get initialForm() {
        return {
            selectedFaculties: [],
        };
    }

    mapPropsToForm = ({subject}) => ({
        selectedFaculties: [...subject.faculties],
    });

    renderFacultyChips = faculties => (
        <Grid container spacing={8}>
            {faculties.map(faculty =>
                <Grid item key={faculty._id}>
                    <FacultyChip
                        faculty={faculty}
                        handleDelete={() => this.setState({
                            form: {
                                selectedFaculties: this.state.form.selectedFaculties.filter(id => id !== faculty._id),
                            },
                        })}
                    />
                </Grid>,
            )}
        </Grid>
    );

    renderMenuItems = faculties => faculties.map(faculty => {
        const { form : { selectedFaculties } } = this.state;
        const { classes } = this.props;

        const selected = selectedFaculties.includes(faculty._id);
        const className = selected ? classes.activeItem : "";
        const fullName = getFullName(faculty.user);
        return (
            <MenuItem
                key={faculty._id}
                value={faculty._id}
                className={className}
            >
                {fullName}
            </MenuItem>
        );
    });

    get submitUpdateAction() {
        const {form: {selectedFaculties: selectedFacultiesId}} = this.state;
        const {subject, onSubmitForm, allFaculties} = this.props;
        const idToFaculty = id => allFaculties.find(faculty => faculty._id === id);
        const selectedFaculties = selectedFacultiesId.map(idToFaculty);
        const oldFaculties = subject.faculties.map(idToFaculty);

        return () => onSubmitForm(subject, selectedFaculties, oldFaculties);
    }

    get modalTitle() {
        return "Set Expert Faculty Members";
    }

    get toastSuccessMessage() {
        return "Subject faculties successfully updated";
    }

    get buttonName() {
        return "Set Expert Faculty Members";
    }

    get dialogActionIsDisabled() {
        return false;
    }

    renderDialogContent = () => {
        const {classes, allFaculties} = this.props;
        const {form, isSubmitting} = this.state;
        const selectedFaculties = form.selectedFaculties.map(id => allFaculties.find(faculty => faculty._id === id));

        return (
            <div className={classes.container}>
                <Grid
                    container
                    className={classes.form}
                    spacing={24}
                    direction="column"
                >
                    <Grid item>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel>Expert Faculty Members</InputLabel>
                            <Select
                                disabled={isSubmitting}
                                multiple
                                value={this.state.form.selectedFaculties}
                                onChange={this.handleFormChange("selectedFaculties")}
                                input={<Input />}
                                renderValue={() => this.renderFacultyChips(selectedFaculties)}
                            >
                                {this.renderMenuItems(allFaculties)}
                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>
            </div>
        );
    };
}

export const ExpertFacultiesModal = wrap(BaseExpertFacultiesModal);
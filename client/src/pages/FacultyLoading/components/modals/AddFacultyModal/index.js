import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { FacultyChip } from "../../../../../components/FacultyChip";
import { getFullName } from "../../../../../utils/user.util";
import { wrap } from "./wrapper";
import { FACULTY_ENUMS } from "../../../../../enums/faculty.enums";

class BaseAddFacultyModal extends ModalFormComponent {
    get initialForm() {
        return {
            selectedFaculties: [],
        };
    }

    mapPropsToForm = props => ({
        selectedFaculties: [],
    })

    // Filters out faculties already selected
    // Also filters out terminated / on leave types
    getAvailableFaculties = () => {
        const {
            termSchedule: { facultyPool },
            allFaculties,
        } = this.props;
        const facultyPoolIds = facultyPool.map(
            facultyResponse => facultyResponse.faculty
        );
        return allFaculties
            .filter(faculty => !facultyPoolIds.includes(faculty._id))
            .filter(faculty => {
                const inactiveEmploymentTypes = [
                    FACULTY_ENUMS.EMPLOYMENT.ON_LEAVE.identifier,
                    FACULTY_ENUMS.EMPLOYMENT.TERMINATED.identifier,
                ];

                return !inactiveEmploymentTypes.includes(faculty.employment);
            });
    };

    renderFacultyChips = faculties => (
        <Grid container spacing={8}>
            {faculties.map(faculty => (
                <Grid item key={faculty._id}>
                    <FacultyChip faculty={faculty} />
                </Grid>
            ))}
        </Grid>
    );

    renderMenuItems = faculties =>
        faculties.map(faculty => {
            const {
                form: { selectedFaculties },
            } = this.state;
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
        const { onSubmitForm, termSchedule } = this.props;
        const {
            form: { selectedFaculties },
        } = this.state;

        return () => onSubmitForm(termSchedule, selectedFaculties);
    }

    get modalTitle() {
        return "Add Faculties to Term";
    }

    get toastSuccessMessage() {
        return "Faculties have been added";
    }

    get buttonName() {
        return "Add faculties";
    }

    renderDialogContent = () => {
        const availableFaculties = this.getAvailableFaculties();
        const { classes, allFaculties } = this.props;
        const { form, isSubmitting } = this.state;
        
        const selectedFaculties = form.selectedFaculties.map(id =>
            allFaculties.find(faculty => faculty._id === id)
        );

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
                                onChange={this.handleFormChange(
                                    "selectedFaculties"
                                )}
                                renderValue={() =>
                                    this.renderFacultyChips(selectedFaculties)
                                }
                            >
                                {this.renderMenuItems(availableFaculties)}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export const AddFacultyModal = wrap(BaseAddFacultyModal);

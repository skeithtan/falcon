import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/es/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { EMPLOYMENT, SEX } from "../../../../../../../enums/faculty.enums";
import validateForm from "../../../../../../../utils/forms";


function getFacultyFormErrors(form) {
    return validateForm({
        birthDate: {
            value: form.birthDate,
        },
    });
}

export default class FacultyForm extends Component {
    render() {
        const {handleFormChange, form, handleNext, handleBack} = this.props;
        const {hasErrors, fieldErrors} = getFacultyFormErrors(form);

        return [
            <FormControl key={0}>
                <FormLabel>Sex</FormLabel>
                <RadioGroup value={form.sex} onChange={handleFormChange("sex")}>
                    <FormControlLabel value={SEX.M} label={SEX.M} control={<Radio />} />
                    <FormControlLabel value={SEX.F} label={SEX.F} control={<Radio />} />
                </RadioGroup>
            </FormControl>,
            <FormControl key={1}>
                <FormLabel>Employment</FormLabel>
                <RadioGroup value={form.employment} onChange={handleFormChange("employment")}>
                    <FormControlLabel value={EMPLOYMENT.FULL_TIME_PERMANENT} label={EMPLOYMENT.FULL_TIME_PERMANENT}
                                      control={<Radio />} />
                    <FormControlLabel value={EMPLOYMENT.FULL_TIME_TEMPORARY} label={EMPLOYMENT.FULL_TIME_TEMPORARY}
                                      control={<Radio />} />
                    <FormControlLabel value={EMPLOYMENT.PART_TIME} label={EMPLOYMENT.PART_TIME}
                                      control={<Radio />} />

                </RadioGroup>
            </FormControl>,
            <FormControl key={2} error={fieldErrors.birthDate.length > 0} fullWidth>
                <TextField
                    error={fieldErrors.birthDate.length > 0}
                    label="Date of Birth"
                    type="date"
                    onChange={handleFormChange("birthDate")}
                    value={form.birthDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {fieldErrors.birthDate.length > 0 &&
                <FormHelperText>{fieldErrors.birthDate[0]}</FormHelperText>
                }
            </FormControl>,
            <Grid container key={3} spacing={16}>
                <Grid item>
                    <Button
                        onClick={handleBack}>
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        disabled={hasErrors}
                        variant="raised"
                        color="primary"
                        onClick={handleNext}>
                        Next
                    </Button>
                </Grid>
            </Grid>,
        ];
    }
}
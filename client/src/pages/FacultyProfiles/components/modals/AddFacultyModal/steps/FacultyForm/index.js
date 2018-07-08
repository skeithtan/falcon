import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import React, { Fragment, PureComponent } from "react";
import { EMPLOYMENT, SEX } from "../../../../../../../enums/faculty.enums";
import { validateForm } from "../../../../../../../utils/forms.util";


function getFacultyFormErrors(form) {
    return validateForm({
        birthDate: {
            value: form.birthDate,
        },
        idNumber: {
            value: form.idNumber,
        },
    });
}

export class FacultyForm extends PureComponent {
    render() {
        const {handleFormChange, form, handleNext, handleBack} = this.props;
        const {hasErrors, fieldErrors} = getFacultyFormErrors(form);
        return (
            <Fragment>
                <FormControl error={fieldErrors.birthDate.length > 0} fullWidth>
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
                </FormControl>

                <FormControl error={fieldErrors.idNumber.length > 0} fullWidth>
                    <TextField
                        error={fieldErrors.idNumber.length > 0}
                        label="Faculty ID Number"
                        onChange={handleFormChange("idNumber")}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">T-</InputAdornment>,
                        }}
                        value={form.idNumber}
                    />
                    {fieldErrors.idNumber.length > 0 &&
                    <FormHelperText>{fieldErrors.idNumber[0]}</FormHelperText>
                    }
                </FormControl>

                <FormControl>
                    <FormLabel>Sex</FormLabel>
                    <RadioGroup value={form.sex} onChange={handleFormChange("sex")}>
                        {Object.entries(SEX).map(([identifier, {name}]) => (
                            <FormControlLabel key={identifier} value={identifier} label={name} control={<Radio />} />
                        ))}
                    </RadioGroup>
                </FormControl>

                <FormControl>
                    <FormLabel>Employment</FormLabel>
                    <RadioGroup value={form.employment} onChange={handleFormChange("employment")}>
                        {Object.entries(EMPLOYMENT).map(([identifier, {name}]) => (
                            <FormControlLabel key={identifier} value={identifier} label={name} control={<Radio />} />
                        ))}

                    </RadioGroup>
                </FormControl>

                <Grid container spacing={16}>
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
                </Grid>
            </Fragment>
        );
    }
}
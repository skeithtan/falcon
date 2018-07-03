import moment from "moment";

/*
 * Returns errors from fields if there are errors. If not, null.
 *    Takes an object that looks like this:
 * {
 *     age : {
 *         value : 'Actual field value',
 *             optional : false,
 *             customValidators : [{
 *             isValid : (fieldValue) => !isNaN(parseInt(fieldValue)),
 *             errorMessage : "Must be a valid integer"
 *         }]
 *     },
 * };
 */
export function validateForm(formFields) {
    const formErrors = {
        hasErrors: false,
        fieldErrors: {},
    };

    Object.entries(formFields).forEach(([fieldName, value]) => {
        const errors = validateField(value);

        if (errors.length > 0) {
            formErrors.hasErrors = true;
        }

        formErrors.fieldErrors[fieldName] = errors;
    });

    return formErrors;
}

function validateField({value, optional, customValidators}) {
    let validators = [];

    // Field is NOT optional by default
    if (optional === undefined || !optional) {
        validators.push(fieldIsNotEmptyValidator);
    }

    if (customValidators !== undefined) {
        validators = validators.concat(customValidators);
    }

    return validators.filter(validator => !validator.isValid(value))
                     .map(validator => validator.errorMessage);

}

// Converts DB date to conform to the required format, "yyyy-MM-dd".
export function dateToFormInputValue(date) {
    return moment(date).format("YYYY-MM-DD");
}

export const mustBeNumberValidator = {
    isValid(value) {
        return /^\d+$/.test(value);
    },
    errorMessage: "Must be a number",
};

export const yearValidators = [
    mustBeNumberValidator,
    {
        isValid(value) {
            const year = parseInt(value, 10);
            return year > 1900 && year < 2200;
        },
        errorMessage: "Must be a valid year",
    },
];

const fieldIsNotEmptyValidator = {
    isValid(fieldValue) {
        return String(fieldValue).trim().length > 0;
    },
    errorMessage: "This field is required",
};
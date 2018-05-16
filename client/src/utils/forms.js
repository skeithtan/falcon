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
export default function validateForm(formFields) {
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

const fieldIsNotEmptyValidator = {
    isValid(fieldValue) {
        return String(fieldValue).length > 0;
    },
    errorMessage: "This field is required",
};
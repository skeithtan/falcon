// Returns errors from fields if there are errors. If not, null.
// Takes an object that looks like this:
// {
//     age : {
//         value : 'Actual field value',
//         optional : false,
//         customValidators : [{
//             isValid : (fieldValue) => !isNaN(parseInt(name)),
//             errorMessage : "Must be a valid integer"
//         }]
//     },
// };
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

const fieldIsNotEmptyValidator = {
    isValid(fieldValue) {
        return String(fieldValue).length > 0;
    },
    errorMessage: "This field is required",
};
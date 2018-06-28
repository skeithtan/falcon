import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { updateFaculty } from "../../../../../services/faculty/faculty";


const mapFormToGraphQLParameters = form => ({
    newFaculty: {
        sex: form.sex,
        employment: form.employment,
        birthDate: form.birthDate,
        idNumber: form.idNumber,
    },
    newUser: {
        name: {
            first: form.firstName,
            last: form.lastName,
        },
        email: form.email,
        photo: form.photo,
    },
});

const mapStateToProps = state => ({
    faculties: state.faculty.faculties,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitForm(faculty, form) {
        const {newFaculty, newUser} = mapFormToGraphQLParameters(form);
        return updateFaculty(faculty._id, newFaculty, newUser)
            .then(result => result.data.faculty.update)
            .then(newFaculty => {
                dispatch(facultyIsUpdated({
                    ...faculty,
                    ...newFaculty,
                }));
                return newFaculty;
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
);
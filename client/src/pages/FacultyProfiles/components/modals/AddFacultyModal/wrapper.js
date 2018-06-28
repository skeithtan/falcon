import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { facultyIsAdded } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addFaculty } from "../../../../../services/faculty/faculty";
import { styles } from "./styles";


const mapFormToGraphQLParameters = form => ({
    newUser: {
        name: {
            first: form.firstName,
            last: form.lastName,
        },
        email: form.email,
        photo: form.photo,
    },
    temporaryPassword: form.password,
    newFaculty: {
        sex: form.sex,
        employment: form.employment,
        birthDate: form.birthDate,
        idNumber: form.idNumber,
    },
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitForm(form) {
        const {newFaculty, newUser, temporaryPassword} = mapFormToGraphQLParameters(form);
        return addFaculty(newFaculty, newUser, temporaryPassword)
            .then(result => {
                const faculty = result.data.faculty.add;
                dispatch(facultyIsAdded(faculty));
                return faculty;
            });
    },
});

export const wrap = compose(
    connect(null, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);
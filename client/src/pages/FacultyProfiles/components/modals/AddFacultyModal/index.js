import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { facultyIsAdded } from "../../../../../redux/actions/faculty.actions";
import { addFaculty } from "../../../../../services/faculty/faculty";
import { AddFacultyModal as Component } from "./AddFacultyModal";
import { styles } from "./styles";


function mapFormToGraphQLParameters(form) {
    return {
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
        },
    };
}

const mapDispatchToProps = dispatch => ({
    submitForm(form) {
        const {newFaculty, newUser, temporaryPassword} = mapFormToGraphQLParameters(form);
        return addFaculty(newFaculty, newUser, temporaryPassword)
            .then(result => {
                const faculty = result.data.faculty.createFaculty;
                dispatch(facultyIsAdded(faculty));
                return faculty;
            });
    },
});

export const AddFacultyModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(styles),
    withRouter,
)(Component);
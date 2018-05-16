import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import {
    activeFacultyChanged,
    detailsIsLoading,
    profileIsAdded,
} from "../../../../../actions/faculty_profiles.actions";
import { addFaculty } from "../../../../../services/faculty.service";
import AddFacultyModal from "./AddFacultyModal";
import styles from "./styles";


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

function mapDispatchToProps(dispatch) {
    return {
        submitForm(form) {
            const {newFaculty, newUser, temporaryPassword} = mapFormToGraphQLParameters(form);
            return addFaculty(newFaculty, newUser, temporaryPassword)
                .then(result => {
                    const faculty = result.data.faculty.createFaculty;
                    dispatch(profileIsAdded(faculty));
                    dispatch(detailsIsLoading());
                    dispatch(activeFacultyChanged(faculty));

                    return faculty;
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
    withStyles(styles),
    withTheme(),
)(AddFacultyModal);
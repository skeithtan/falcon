import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { updateFaculty } from "../../../../../services/faculty/faculty";
import styles from "../generic_modal_style";
import UpdateFacultyOverviewModal from "./UpdateFacultyOverviewModal";


function mapFormToGraphQLParameters(form) {
    return {
        _id: form._id,
        newFaculty: {
            sex: form.sex,
            employment: form.employment,
            birthDate: form.birthDate,
        },
        newUser: {
            name: {
                first: form.firstName,
                last: form.lastName,
            },
            email: form.email,
            photo: form.photo,
        },
    };
}

function mapStateToProps(state) {
    return {
        faculties: state.facultyProfiles.faculties,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        submitForm(form) {
            const {_id, newFaculty, newUser} = mapFormToGraphQLParameters(form);
            return updateFaculty(_id, newFaculty, newUser)
                .then(result => {
                    const faculty = result.data.faculty.updateFaculty;
                    dispatch(profileIsUpdated(faculty));
                    return faculty;
                });
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(UpdateFacultyOverviewModal);
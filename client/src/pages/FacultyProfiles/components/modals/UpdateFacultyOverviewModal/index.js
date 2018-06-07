import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { updateFaculty } from "../../../../../services/faculty/faculty";
import { UpdateFacultyOverviewModal as Component } from "./UpdateFacultyOverviewModal";


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

const mapStateToProps = state => ({
    faculties: state.faculty.faculties,
});

const mapDispatchToProps = dispatch => ({
    submitForm(form) {
        const {_id, newFaculty, newUser} = mapFormToGraphQLParameters(form);
        return updateFaculty(_id, newFaculty, newUser)
            .then(result => {
                const faculty = result.data.faculty.updateFaculty;
                dispatch(facultyIsUpdated(faculty));
                return faculty;
            });
    },
});

export const UpdateFacultyOverviewModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);
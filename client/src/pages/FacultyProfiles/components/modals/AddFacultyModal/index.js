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


function mapDispatchToProps(dispatch) {
    return {
        submitFaculty(newFaculty, newUser, temporaryPassword) {
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
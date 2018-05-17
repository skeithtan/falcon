import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { updateDegree } from "../../../../../services/faculty/degree";
import { addDegree } from "../../../../../services/faculty/degree";
import DegreeModal from "./DegreeModal";
import styles from "./styles";


function mapDispatchToProps(dispatch) {
    return {
        submitAddDegreeForm(form, faculty) {
            return addDegree(faculty._id, form)
                .then(result => {
                    const newDegree = result.data.degree.create;
                    const newFaculty = {
                        ...faculty,
                        degrees: [
                            ...faculty.degrees,
                            newDegree,
                        ],
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newDegree;
                });
        },

        submitUpdateDegreeForm(form, degreeId, faculty) {
            return updateDegree(faculty._id, degreeId, form)
                .then(result => {
                    const newDegree = result.data.degree.update;
                    const newFaculty = {
                        ...faculty,
                        degrees: faculty.degrees.map(degree => {
                            if (degree._id === degreeId) {
                                return newDegree;
                            }

                            return degree;
                        }),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newDegree;
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(DegreeModal);
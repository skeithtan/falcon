import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { addDegree, updateDegree } from "../../../../../services/faculty/degree";
import {
    addDegree as requestAddDegree,
    updateDegree as requestUpdateDegree,
} from "../../../../../services/faculty/request_profile_changes/degree";
import { DegreeModal as Component } from "./DegreeModal";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    submitAddDegreeForm(form, faculty) {
        return addDegree(faculty._id, form)
            .then(result => {
                const newDegree = result.data.degree.add;
                const newFaculty = {
                    ...faculty,
                    degrees: [
                        ...faculty.degrees,
                        newDegree,
                    ],
                };

                dispatch(facultyIsUpdated(newFaculty));
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

                dispatch(facultyIsUpdated(newFaculty));
                return newDegree;
            });
    },

    submitRequestAddDegreeForm(form) {
        return requestAddDegree(form);
    },

    submitRequestUpdateDegreeForm(form, degreeId) {
        return requestUpdateDegree(degreeId, form);
    },
});

export const DegreeModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);
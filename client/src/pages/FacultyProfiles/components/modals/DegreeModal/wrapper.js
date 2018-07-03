import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { changeRequestIsAdded } from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addDegree, updateDegree } from "../../../../../services/faculty/degree";
import { requestAddDegree } from "../../../../../services/faculty/request_profile_changes";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

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

    submitRequestAddDegreeForm(form, faculty) {
        return requestAddDegree(form)
            .then(result => result.data.requestProfileChange.degree.add)
            .then(newDegree => {
                dispatch(changeRequestIsAdded(newDegree, faculty._id));
                return newDegree;
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
);
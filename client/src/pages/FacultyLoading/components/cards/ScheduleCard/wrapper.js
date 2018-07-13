import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { connect } from "react-redux";
import { initiatefetchAllFaculties } from "../../../../../utils/faculty.util";
import { fetchSubjectList } from "../../../../../utils/subject.util";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { updateClassSchedule, removeClassSchedule } from "../../../../../services/classes/classes.service";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";

const mapStateToProps = state => ({
    faculties: state.faculty,
    subjects: state.subject,
});

const mapDispatchToProps = dispatch => ({
    fetchAllFaculties() {
        initiatefetchAllFaculties(dispatch);
    },
    fetchAllSubjects() {
        fetchSubjectList(dispatch);
    },
    onRemoveClassSchedule(termSchedule, classSchedule) {
        return removeClassSchedule(termSchedule._id, classSchedule._id).then(() => {
            const newTermSchedule = {
                ...termSchedule,
                classes: termSchedule.classes.filter(
                    ({_id}) => _id !== classSchedule._id
                ),
            };
            dispatch(termScheduleIsUpdated(newTermSchedule));
        });
    },
    onSetFaculty(faculty, oldClassSchedule, termSchedule) {
        const newClassSchedule = {
            ...oldClassSchedule,
            faculty: faculty._id,
        };

        const oldTermSchedule = { ...termSchedule };

        const newTermSchedule = {
            ...oldTermSchedule,
            classes: oldTermSchedule.classes.map(classSchedule => {
                if (newClassSchedule._id === classSchedule._id) {
                    return newClassSchedule;
                }

                return classSchedule;
            }),
        };

        const revertToOldSchedule = errors => {
            console.log(errors);
            dispatch(termScheduleIsUpdated(oldTermSchedule));
            dispatch(
                toastIsShowing(
                    "An error occurred while updating class schedule"
                )
            );
        };

        dispatch(termScheduleIsUpdated(newTermSchedule));
        return updateClassSchedule(
            newTermSchedule._id,
            newClassSchedule._id,
            newClassSchedule
        )
            .then(result => {
                if (result.errors) {
                    revertToOldSchedule(result.errors);
                }
            })
            .catch(error => revertToOldSchedule(error));
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles),
    withRouter
);

import compose from "recompose/compose";
import { connect } from "react-redux";
import { removeFacultyFromTerm } from "../../../../../services/classes/faculties.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },
    onConfirmRemove(termSchedule, faculty) {
        const newTermSchedule = {
            ...termSchedule,
            // Remove faculty from pool
            facultyPool: termSchedule.facultyPool.filter(
                response => response.faculty !== faculty._id
            ),
            classes: termSchedule.classes.map(classSchedule => {
                // Get all classes the faculty was assigned to
                if (classSchedule.faculty === faculty._id) {
                    // And leave them unassigned
                    return {
                        ...classSchedule,
                        faculty: null
                    };
                }

                return classSchedule;
            }),
        };

        return removeFacultyFromTerm(termSchedule._id, faculty._id).then(() => {
            dispatch(termScheduleIsUpdated(newTermSchedule));
        });
    },
});

export const wrap = compose(
    connect(
        null,
        mapDispatchToProps
    )
);

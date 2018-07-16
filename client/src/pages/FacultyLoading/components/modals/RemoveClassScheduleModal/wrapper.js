import compose from "recompose/compose";
import { connect } from "react-redux";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { removeClassSchedule } from "../../../../../services/classes/classes.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";


const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },
    onRemoveClassSchedule(termSchedule, classSchedule) {
        return removeClassSchedule(termSchedule._id, classSchedule._id).then(
            () => {
                const newTermSchedule = {
                    ...termSchedule,
                    classes: termSchedule.classes.filter(
                        ({ _id }) => _id !== classSchedule._id
                    ),
                };
                dispatch(termScheduleIsUpdated(newTermSchedule));
            }
        );
    },
});

export const wrap = compose(connect(null, mapDispatchToProps));
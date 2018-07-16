import compose from "recompose/compose";
import { connect } from "react-redux";
import { advanceTermScheduleStatus } from "../../../../../services/classes/term_schedule.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    onConfirmAdvance(termSchedule) {
        return advanceTermScheduleStatus(termSchedule._id)
            .then(result => result.data.termSchedule.status.advance)
            .then(newStatus => {
                console.log("New status is", newStatus);
                dispatch(
                    termScheduleIsUpdated({
                        ...termSchedule,
                        status: newStatus,
                    })
                );
                return newStatus;
            });
    },
});

export const wrap = compose(
    connect(
        null,
        mapDispatchToProps
    )
);

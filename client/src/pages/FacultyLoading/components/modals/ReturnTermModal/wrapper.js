import compose from "recompose/compose";
import { connect } from "react-redux";
import { returnTermScheduleStatus } from "../../../../../services/classes/term_schedule.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    onConfirmReturn(termSchedule) {
        return returnTermScheduleStatus(termSchedule._id)
            .then(result => result.data.termSchedule.status.return)
            .then(newStatus => {
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

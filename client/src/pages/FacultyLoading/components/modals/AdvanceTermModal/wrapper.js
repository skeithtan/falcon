import compose from "recompose/compose";
import { connect } from "react-redux";
import { advanceTermScheduleStatus } from "../../../../../services/classes/term_schedule.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { TERM_STATUSES } from "../../../../../enums/class.enums";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    onConfirmAdvance(termSchedule) {
        return advanceTermScheduleStatus(termSchedule._id)
            .then(result => result.data.termSchedule.status.advance)
            .then(newStatus => {
                const newTermSchedule = {
                    ...termSchedule,
                    status: newStatus,
                };

                if (newStatus === TERM_STATUSES.FEEDBACK_GATHERING.identifier) {
                    // Reset feedback on feedback gathering
                    newTermSchedule.facultyPool = newTermSchedule.facultyPool
                        // Set dirty responses to null
                        .map(response => {
                            if (
                                response.feedback &&
                                response.feedback.isDirty
                            ) {
                                return {
                                    ...response,
                                    feedback: null,
                                };
                            }

                            return response;
                        });
                }

                dispatch(termScheduleIsUpdated(newTermSchedule));
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

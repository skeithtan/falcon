import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { genericModalStyle } from "../../../../../components/styles";
import { setFacultyFeedback } from "../../../../../services/classes/faculty_schedules.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitFeedback({ status, rejectionReason, newAvailability }, termSchedule) {
        return setFacultyFeedback(status, rejectionReason, newAvailability)
            .then(result => result.data.setFacultyFeedback)
            .then(feedback => {
                dispatch(
                    termScheduleIsUpdated({
                        ...termSchedule,
                        feedback,
                    })
                );

                return feedback;
            });
    },
});

export const wrap = compose(
    connect(
        null,
        mapDispatchToProps
    ),
    withStyles(genericModalStyle)
);

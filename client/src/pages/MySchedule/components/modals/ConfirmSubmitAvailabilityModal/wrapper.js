import compose from "recompose/compose";
import { connect } from "react-redux";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { setFacultyAvailability } from "../../../../../services/classes/faculty_schedules.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },
    onConfirmSubmitAvailability(availability, termSchedule) {
        const newTermSchedule = {
            ...termSchedule,
            availability: [...availability],
        };

        return setFacultyAvailability(availability).then(() =>
            dispatch(termScheduleIsUpdated(newTermSchedule))
        );
    },
});

export const wrap = compose(
    connect(
        null,
        mapDispatchToProps
    )
);

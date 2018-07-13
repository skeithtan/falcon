import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { genericModalStyle } from "../../../../../components/styles";
import { connect } from "react-redux";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addClassSchedule } from "../../../../../services/classes/classes.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddClassSchedule(form, termSchedule) {
        return addClassSchedule(termSchedule._id, form)
            .then(result => result.data.termSchedule.classes.add)
            .then(newClass => {
                const newTermSchedule = {
                    ...termSchedule,
                    classes: [...termSchedule.classes, newClass]
                };

                dispatch(termScheduleIsUpdated(newTermSchedule));
                return newClass;
            });
    },

    submitUpdateClassSchedule(form) {
        dispatch();
    },
});

export const wrap = compose(
    connect(
        null,
        mapDispatchToProps
    ),
    withStyles(genericModalStyle)
);

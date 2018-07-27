import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { genericModalStyle } from "../../../../../components/styles";
import { connect } from "react-redux";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addClassSchedule, updateClassSchedule } from "../../../../../services/classes/classes.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";

const mapStateToProps = state => ({
    subjects: state.subject.subjects,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddClassSchedule(form, termSchedule) {
        return addClassSchedule(termSchedule._id, form)
            .then(result => result.data.termSchedule.classes.add)
            .then(newClassSchedule => {
                const newTermSchedule = {
                    ...termSchedule,
                    classes: [...termSchedule.classes, newClassSchedule],
                };

                dispatch(termScheduleIsUpdated(newTermSchedule));
                return newClassSchedule;
            });
    },

    submitUpdateClassSchedule(form, termSchedule, oldClassSchedule) {
        return updateClassSchedule(termSchedule._id, oldClassSchedule._id, form)
            .then(result => result.data.termSchedule.classes.update)
            .then(newClassSchedule => {
                const newTermSchedule = {
                    ...termSchedule,
                    classes: termSchedule.classes.map(classSchedule => {
                        if (classSchedule._id === oldClassSchedule._id) {
                            return newClassSchedule;
                        }
                        return classSchedule;
                    })
                };

                dispatch(termScheduleIsUpdated(newTermSchedule));
                return newClassSchedule;
            });
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(genericModalStyle)
);

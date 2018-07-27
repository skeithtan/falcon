import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addClassSchedule } from "../../../../../services/classes/classes.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { styles } from "./styles";
import { MEETING_DAYS } from "../../../../../enums/class.enums";

// TODO: Fix M_TH T_F
const mapFormToGraphQLParameters = ({ subject, M_TH, T_F }) => {
    // Inject meetingDays to classSchedules
    const mondayThursdays = M_TH.map(classSchedule => ({
        ...classSchedule,
        meetingDays: MEETING_DAYS.M_TH.identifier,
    }));
    const tuesdayFridays = T_F.map(classSchedule => ({
        ...classSchedule,
        meetingDays: MEETING_DAYS.T_F.identifier,
    }));

    const classSchedules = mondayThursdays.concat(tuesdayFridays);

    // Inject subject to classSchedules
    return classSchedules.map(classSchedule => ({
        ...classSchedule,
        subject,
    }));
};

const mapStateToProps = state => ({
    subjects: state.subject.subjects,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddClasses(form, termSchedule) {
        const newClassesInput = mapFormToGraphQLParameters(form);
        return addClassSchedule(termSchedule._id, newClassesInput)
            .then(result => result.data.termSchedule.classes.add)
            .then(newClasses => {
                const newTermSchedule = {
                    ...termSchedule,
                    classes: [...termSchedule.classes, ...newClasses],
                };

                dispatch(termScheduleIsUpdated(newTermSchedule));
                return newClasses;
            });
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);

import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { addFacultiesToTerm } from "../../../../../services/classes/faculties.service";
import { termScheduleIsUpdated } from "../../../../../redux/actions/faculty_loading.actions";
import { genericModalStyle } from "../../../../../components/styles";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    onSubmitForm(termSchedule, newFaculties) {
        const newTermSchedule = { ...termSchedule };
        return addFacultiesToTerm(termSchedule._id, newFaculties)
            .then(response => response.data.termSchedule.faculties.add)
            .then(newFacultyResponses => {
                newTermSchedule.facultyPool = newFacultyResponses;
                dispatch(termScheduleIsUpdated(newTermSchedule));
                return newFacultyResponses;
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

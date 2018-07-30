import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { termScheduleIsAdded } from "../../../../../redux/actions/faculty_loading.actions";
import { addTermSchedule } from "../../../../../services/classes/term_schedule.service";

const mapDispatchToProps = dispatch => ({
    onConfirmPlanNextTerm(nextTerm) {
        return addTermSchedule(nextTerm.startYear, nextTerm.term)
            .then(result => result.data.addTermSchedule)
            .then(newTermSchedule => {
                dispatch(termScheduleIsAdded(newTermSchedule));
                return newTermSchedule;
            });
    },
});

export const wrap = compose(
    connect(
        null,
        mapDispatchToProps
    ),
    withRouter
);

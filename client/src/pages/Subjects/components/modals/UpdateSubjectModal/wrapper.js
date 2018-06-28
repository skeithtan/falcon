import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { subjectIsUpdated } from "../../../../../redux/actions/subject.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { updateSubject } from "../../../../../services/subjects.service";


const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitUpdateSubject(subject, form) {
        return updateSubject(subject._id, form)
            .then(result => {
                const subject = result.data.subject.update;
                dispatch(subjectIsUpdated(subject));
                return subject;
            });
    },
});

export const wrap = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
);
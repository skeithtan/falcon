import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { subjectIsUpdated } from "../../../../../redux/actions/subject.actions";
import { updateSubject } from "../../../../../services/subjects.service";
import { UpdateSubjectModal as Component } from "./UpdateSubjectModal";


const mapDispatchToProps = dispatch => ({
    submitUpdateSubject(subject, form) {
        return updateSubject(subject._id, form)
            .then(result => {
                const subject = result.data.subject.update;
                dispatch(subjectIsUpdated(subject));
                return subject;
            });
    },
});

export const UpdateSubjectModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);
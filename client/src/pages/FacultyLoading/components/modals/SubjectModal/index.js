import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchFacultyListThunk } from "../../../../../utils/faculty.util";
import { subjectIsAdded, subjectIsUpdated } from "../../../../../actions/subject.actions";
import { addSubject, updateSubject } from "../../../../../services/subjects.service";
import styles from "./styles";
import SubjectModal from "./SubjectModal";


function mapStateToProps(state) {
    return {
        ...state.faculty,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            return dispatch(getFetchFacultyListThunk());
        },
        submitAddSubject(form) {
            return addSubject(form)
                .then(result => {
                    const subject = result.data.subject.create;
                    dispatch(subjectIsAdded(subject));
                    return subject;
                })
        },
        submitUpdateSubject(subject, form) {
            return updateSubject(subject._id, form)
                .then(result => {
                    const subject = result.data.subject.update;
                    dispatch(subjectIsUpdated(subject));
                    return subject;
                })
        }
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(SubjectModal);
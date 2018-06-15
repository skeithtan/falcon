import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { subjectIsAdded } from "../../../../../redux/actions/subject.actions";
import { addSubject } from "../../../../../services/subjects.service";
import { fetchAllFaculties } from "../../../../../utils/faculty.util";
import { styles } from "./styles";
import { AddSubjectModal as Component } from "./AddSubjectModal";


const mapStateToProps = state => ({
    ...state.faculty,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        fetchAllFaculties(dispatch);
    },
    submitAddSubject(form) {
        return addSubject(form)
            .then(result => {
                const subject = result.data.subject.add;
                dispatch(subjectIsAdded(subject));
                return subject;
            });
    },
});

export const AddSubjectModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
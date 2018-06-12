import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { setTeachingSubjects } from "../../../../../services/faculty/teaching_subjects";
import { addFacultyToSubjects } from "../../../../../utils/subject.util";
import { TeachingSubjectModal as Component } from "./TeachingSubjectModal";


const mapDispatchToProps = dispatch => ({
    onSubmitForm(faculty, selectedSubjects) {
        const selectedSubjectsId = selectedSubjects.map(subject => subject._id);
        return setTeachingSubjects(faculty._id, selectedSubjectsId)
            .then(result => result.data.teachingSubject.set)
            .then(newTeachingSubjects => {
                dispatch(facultyIsUpdated({
                    ...faculty,
                    teachingSubjects: newTeachingSubjects,
                }));

                addFacultyToSubjects({
                    dispatch,
                    faculty,
                    subjects: selectedSubjects,
                });

                return newTeachingSubjects;
            });
    },
});

export const TeachingSubjectModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);
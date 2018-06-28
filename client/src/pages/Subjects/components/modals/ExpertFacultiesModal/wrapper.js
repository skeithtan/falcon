import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { subjectIsUpdated } from "../../../../../redux/actions/subject.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { updateSubject } from "../../../../../services/subjects.service";
import { getDifference } from "../../../../../utils/difference.util";
import { addSubjectToFaculties, removeSubjectFromFaculties } from "../../../../../utils/subject.util";


const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    onSubmitForm(subject, selectedFaculties, oldFaculties) {
        const selectedFacultiesId = selectedFaculties.map(faculty => faculty._id);
        const {addedItems, removedItems} = getDifference(selectedFaculties, oldFaculties);

        return updateSubject(subject._id, {faculties: selectedFacultiesId})
            .then(result => result.data.subject.update.faculties)
            .then(newFaculties => {
                dispatch(subjectIsUpdated({
                    ...subject,
                    faculties: newFaculties,
                }));

                addSubjectToFaculties({
                    dispatch,
                    subject,
                    faculties: addedItems,
                });

                removeSubjectFromFaculties({
                    dispatch,
                    subject,
                    faculties: removedItems,
                });

                return newFaculties;
            });
    },
});

export const wrap = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
);
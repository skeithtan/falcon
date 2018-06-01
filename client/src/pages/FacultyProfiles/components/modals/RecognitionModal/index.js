import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { genericModalStyle } from "../../../../../components/styles";
import { addRecognition, updateRecognition } from "../../../../../services/faculty/recognition";
import { RecognitionModal as Component } from "./RecognitionModal";


function mapFormToRecognitionInput(form) {
    return {
        title: form.title,
        basis: form.basis,
        sponsor: form.sponsor,
        date: {
            month: form.month,
            year: form.year,
        },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        submitAddRecognitionForm(form, faculty) {
            const recognition = mapFormToRecognitionInput(form);
            return addRecognition(faculty._id, recognition)
                .then(result => {
                    const newRecognition = result.data.recognition.create;
                    const newFaculty = {
                        ...faculty,
                        recognitions: [
                            ...faculty.recognitions,
                            newRecognition,
                        ],
                    };

                    dispatch(facultyIsUpdated(newFaculty));
                    return newRecognition;
                });
        },

        submitUpdateRecognitionForm(form, recognitionId, faculty) {
            const recognition = mapFormToRecognitionInput(form);
            return updateRecognition(faculty._id, recognitionId, recognition)
                .then(result => {
                    const newRecognition = result.data.recognition.update;
                    const newFaculty = {
                        ...faculty,
                        recognitions: faculty.recognitions.map(recognition => {
                            if (recognition._id === recognitionId) {
                                return newRecognition;
                            }

                            return recognition;
                        }),
                    };

                    dispatch(facultyIsUpdated(newFaculty));
                    return newRecognition;
                });
        },
    };
}

export const RecognitionModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);

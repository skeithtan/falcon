import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { addPresentation, updatePresentation } from "../../../../../services/faculty/presentation";
import styles from "../generic_modal_style";
import PresentationModal from "./PresentationModal";


function mapFormToPresentationInput(form) {
    return {
        title: form.title,
        category: form.category,
        date: {
            month: form.month,
            year: form.year,
        },
        sponsor: form.sponsor,
        venue: form.venue,
        conference: form.conference,
        medium: form.medium,
        daysDuration: form.daysDuration,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        submitAddPresentationForm(form, faculty) {
            const presentation = mapFormToPresentationInput(form);
            return addPresentation(faculty._id, presentation)
                .then(result => {
                    const newPresentation = result.data.presentation.create;
                    const newFaculty = {
                        ...faculty,
                        presentations: [
                            ...faculty.presentations,
                            newPresentation,
                        ],
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newPresentation;
                });
        },

        submitUpdatePresentationForm(form, presentationId, faculty) {
            const presentation = mapFormToPresentationInput(form);
            return updatePresentation(faculty._id, presentationId, presentation)
                .then(result => {
                    const newPresentation = result.data.presentation.update;
                    const newFaculty = {
                        ...faculty,
                        presentations: faculty.presentations.map(presentation => {
                            if (presentation._id === presentationId) {
                                return newPresentation;
                            }

                            return presentation;
                        }),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newPresentation;
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(PresentationModal);

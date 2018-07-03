import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { changeRequestIsAdded } from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addPresentation, updatePresentation } from "../../../../../services/faculty/presentation";
import { requestAddPresentation } from "../../../../../services/faculty/request_profile_changes";


const mapFormToPresentationInput = form => ({
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
});

const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddPresentationForm(form, faculty) {
        const presentation = mapFormToPresentationInput(form);
        return addPresentation(faculty._id, presentation)
            .then(result => {
                const newPresentation = result.data.presentation.add;
                const newFaculty = {
                    ...faculty,
                    presentations: [
                        ...faculty.presentations,
                        newPresentation,
                    ],
                };

                dispatch(facultyIsUpdated(newFaculty));
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

                dispatch(facultyIsUpdated(newFaculty));
                return newPresentation;
            });
    },

    submitRequestAddPresentationForm(form, faculty) {
        const presentation = mapFormToPresentationInput(form);
        return requestAddPresentation(presentation)
            .then(result => result.data.requestProfileChange.presentation.add)
            .then(newPresentation => {
                dispatch(changeRequestIsAdded(newPresentation, faculty._id));
                return newPresentation;
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
);

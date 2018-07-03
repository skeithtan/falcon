import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { changeRequestIsAdded } from "../../../../../redux/actions/change_requests.actions";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addExtensionWork, updateExtensionWork } from "../../../../../services/faculty/extension_work";
import { requestAddExtensionWork } from "../../../../../services/faculty/request_profile_changes";


const mapFormToExtensionWorkInput = form => ({
    title: form.title,
    roles: form.roles,
    venue: form.venue,
});

const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    showToast(message) {
        dispatch(toastIsShowing(message));
    },

    submitAddExtensionWorkForm(form, faculty) {
        const extensionWork = mapFormToExtensionWorkInput(form);
        return addExtensionWork(faculty._id, extensionWork)
            .then(result => {
                const newExtensionWork = result.data.extensionWork.add;
                const newFaculty = {
                    ...faculty,
                    extensionWorks: [
                        ...faculty.extensionWorks,
                        newExtensionWork,
                    ],
                };

                dispatch(facultyIsUpdated(newFaculty));
                return newExtensionWork;
            });
    },

    submitUpdateExtensionWorkForm(form, extensionWorkId, faculty) {
        const extensionWork = mapFormToExtensionWorkInput(form);
        return updateExtensionWork(faculty._id, extensionWorkId, extensionWork)
            .then(result => {
                const newExtensionWork = result.data.extensionWork.update;
                const newFaculty = {
                    ...faculty,
                    extensionWorks: faculty.extensionWorks.map(extensionWork => {
                        if (extensionWork._id === extensionWorkId) {
                            return newExtensionWork;
                        }

                        return extensionWork;
                    }),
                };

                dispatch(facultyIsUpdated(newFaculty));
                return newExtensionWork;
            });
    },

    submitRequestAddExtensionWorkForm(form, faculty) {
        const extensionWork = mapFormToExtensionWorkInput(form);
        return requestAddExtensionWork(extensionWork)
            .then(result => result.data.requestProfileChange.extensionWork.add)
            .then(newExtensionWork => {
                dispatch(changeRequestIsAdded(newExtensionWork, faculty._id));
                return newExtensionWork;
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
);

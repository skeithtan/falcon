import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { toastIsShowing } from "../../../../../redux/actions/toast.actions";
import { addExtensionWork, updateExtensionWork } from "../../../../../services/faculty/extension_work";
import { ExtensionWorkModal as Component } from "./ExtensionWorkModal";


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
});

export const ExtensionWorkModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);

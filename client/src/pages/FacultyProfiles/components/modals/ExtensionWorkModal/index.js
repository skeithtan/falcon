import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { addExtensionWork, updateExtensionWork } from "../../../../../services/faculty/extension_work";
import styles from "../generic_modal_style";
import ExtensionWorkModal from "./ExtensionWorkModal";


function mapFormToExtensionWorkInput(form) {
    return {
        title: form.title,
        roles: form.roles,
        venue: form.venue,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        submitAddExtensionWorkForm(form, faculty) {
            const extensionWork = mapFormToExtensionWorkInput(form);
            return addExtensionWork(faculty._id, extensionWork)
                .then(result => {
                    const newExtensionWork = result.data.extensionWork.create;
                    const newFaculty = {
                        ...faculty,
                        extensionWorks: [
                            ...faculty.extensionWorks,
                            newExtensionWork,
                        ],
                    };

                    dispatch(profileIsUpdated(newFaculty));
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

                            return newExtensionWork;
                        }),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                    return newExtensionWork;
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(ExtensionWorkModal);

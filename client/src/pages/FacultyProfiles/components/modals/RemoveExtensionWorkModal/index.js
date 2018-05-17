import { connect } from "react-redux";
import compose from "recompose/compose";
import { profileIsUpdated } from "../../../../../actions/faculty_profiles.actions";
import { removeExtensionWork } from "../../../../../services/faculty/extension_work";
import RemoveExtensionWorkModal from "./RemoveExtensionWorkModal";


function mapDispatchToProps(dispatch) {
    return {
        onConfirmRemove(faculty, _id) {
            return removeExtensionWork(faculty._id, _id)
                .then(() => {
                    const newFaculty = {
                        ...faculty,
                        extensionWorks: faculty.extensionWorks.filter(
                            extensionWork => extensionWork._id !== _id,
                        ),
                    };

                    dispatch(profileIsUpdated(newFaculty));
                });
        },
    };
}

export default compose(
    connect(null, mapDispatchToProps),
)(RemoveExtensionWorkModal);
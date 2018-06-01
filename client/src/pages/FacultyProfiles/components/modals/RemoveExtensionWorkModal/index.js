import { connect } from "react-redux";
import compose from "recompose/compose";
import { facultyIsUpdated } from "../../../../../redux/actions/faculty.actions";
import { removeExtensionWork } from "../../../../../services/faculty/extension_work";
import { RemoveExtensionWorkModal as Component } from "./RemoveExtensionWorkModal";


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

                    dispatch(facultyIsUpdated(newFaculty));
                });
        },
    };
}

export const RemoveExtensionWorkModal = compose(
    connect(null, mapDispatchToProps),
)(Component);
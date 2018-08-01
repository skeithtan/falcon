import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { DropTarget } from "react-dnd";
import { connect } from "react-redux";
import { DropTypes } from "../../../../enums/drop_types.enums";
import { updateClassSchedule } from "../../../../services/classes/classes.service";
import { termScheduleIsUpdated } from "../../../../redux/actions/faculty_loading.actions";
import { toastIsShowing } from "../../../../redux/actions/toast.actions";
import { mapClassScheduleToGraphQLInput } from "../../../../utils/faculty_loading.util";

const classScheduleItemTarget = {
    drop(props, monitor) {
        const { termSchedule, classSchedule, onSetFaculty } = props;
        const { faculty } = monitor.getItem();
        onSetFaculty(faculty, classSchedule, termSchedule);
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    hovering: {
        ...monitor.getItem(),
    },
});

const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    onSetFaculty(faculty, oldClassSchedule, termSchedule) {
        const newClassSchedule = {
            ...oldClassSchedule,
            faculty: faculty._id,
        };

        const newTermSchedule = {
            ...termSchedule,
            classes: termSchedule.classes.map(classSchedule => {
                if (newClassSchedule._id === classSchedule._id) {
                    return newClassSchedule;
                }

                return classSchedule;
            }),

            // Mark feedback as dirty if feedback is present
            facultyPool: termSchedule.facultyPool.map(response => {
                if (
                    response.faculty === faculty._id &&
                    response.feedback !== null
                ) {
                    return {
                        ...response,
                        feedback: {
                            ...response.feedback,
                            isDirty: true,
                        },
                    };
                }

                return response;
            }),
        };

        const revertToOldSchedule = errors => {
            console.log(errors);
            dispatch(termScheduleIsUpdated(termSchedule));
            dispatch(
                toastIsShowing(
                    "An error occurred while updating class schedule"
                )
            );
        };

        dispatch(termScheduleIsUpdated(newTermSchedule));

        const newClassScheduleInput = mapClassScheduleToGraphQLInput(
            newClassSchedule
        );
        return updateClassSchedule(
            newTermSchedule._id,
            newClassSchedule._id,
            newClassScheduleInput
        )
            .then(result => {
                if (result.errors) {
                    revertToOldSchedule(result.errors);
                }
            })
            .catch(error => revertToOldSchedule(error));
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    DropTarget(DropTypes.FACULTY, classScheduleItemTarget, collect),
    withStyles(styles)
);

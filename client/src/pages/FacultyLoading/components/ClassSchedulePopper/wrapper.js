import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { styles } from "./styles";
import { updateClassSchedule } from "../../../../services/classes/classes.service";
import { termScheduleIsUpdated } from "../../../../redux/actions/faculty_loading.actions";
import { toastIsShowing } from "../../../../redux/actions/toast.actions";
import { mapClassScheduleToGraphQLInput } from "../../../../utils/faculty_loading.util";

const mapStateToProps = state => ({
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    onRemoveFacultyFromClassSchedule(faculty, termSchedule, classSchedule) {
        const newClassSchedule = {
            ...classSchedule,
            faculty: null,
        };

        const newTermSchedule = {
            ...termSchedule,
            classes: termSchedule.classes.map(classSchedule => {
                if (newClassSchedule._id === classSchedule._id) {
                    return newClassSchedule;
                }

                return classSchedule;
            }),

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
            termSchedule._id,
            classSchedule._id,
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
    withStyles(styles),
    withRouter
);

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import {
    termSchedulesFetchError,
    termSchedulesIsFetched,
    termSchedulesIsLoading,
} from "../../redux/actions/faculty_loading.actions";
import { fetchAllTermSchedules } from "../../services/classes/term_schedule.service";
import { styles } from "./styles";

const mapStateToProps = state => ({
    ...state.facultyLoading,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(termSchedulesIsLoading());
        return fetchAllTermSchedules()
            .then(({ data, errors }) => {
                if (errors) {
                    throw new Error(errors[0].message);
                }

                return data.termSchedules;
            })
            .then(termSchedules => {
                dispatch(termSchedulesIsFetched(termSchedules));
                return termSchedules;
            })
            .catch(error => {
                dispatch(termSchedulesFetchError([error.message]));
            });
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

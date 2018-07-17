import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchAllMySchedules } from "../../services/classes/faculty_schedules.service";
import { termSchedulesIsFetched } from "../../redux/actions/faculty_loading.actions";
import { fetchSubjectList } from "../../utils/subject.util";
import { styles } from "./styles";

const mapStateToProps = state => ({
    termSchedules: state.facultyLoading,
    subjects: state.subject,
});

const mapDispatchToProps = dispatch => ({
    fetchMySchedules() {
        return fetchAllMySchedules()
            .then(result => result.data.mySchedules)
            .then(termSchedules => {
                dispatch(termSchedulesIsFetched(termSchedules));
                return termSchedules;
            });
    },

    fetchSubjects() {
        return fetchSubjectList(dispatch);
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);

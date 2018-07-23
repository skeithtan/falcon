import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { styles } from "./styles";
import { connect } from "react-redux";
import { initiatefetchAllFaculties } from "../../../../utils/faculty.util";
import { fetchSubjectList } from "../../../../utils/subject.util";

const mapStateToProps = state => ({
    faculties: state.faculty,
    subjects: state.subject,
});

const mapDispatchToProps = dispatch => ({
    fetchAllFaculties() {
        initiatefetchAllFaculties(dispatch);
    },
    fetchAllSubjects() {
        fetchSubjectList(dispatch);
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);

import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { connect } from "react-redux";
import { fetchSubjectList } from "../../utils/subject.util";

const mapStateToProps = state => ({
    subjects: state.subject,
});

const mapDispatchToProps = dispatch => ({
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

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchSubjectList } from "../../../../../utils/subject.util";
import { styles } from "./styles";
import { TeachingSubjectsCard as Component } from "./TeachingSubjectsCard";


const mapStateToProps = state => ({
    subjects: state.subject,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchSubjectList() {
        return fetchSubjectList(dispatch);
    },
});

export const TeachingSubjectsCard = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
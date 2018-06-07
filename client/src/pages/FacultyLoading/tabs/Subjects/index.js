import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchSubjectList } from "../../../../utils/subject.util";
import { styles } from "./styles";
import { SubjectsTab as Component } from "./Subjects";


const mapStateToProps = state => ({
    ...state.subject,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        fetchSubjectList(dispatch);
    },
});

export const SubjectsTab = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchSubjectList } from "../../../../utils/subject.util";
import { styles } from "./styles";
import { SubjectsTab as Component } from "./Subjects";


function mapStateToProps(state) {
    return {
        ...state.subject,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            fetchSubjectList(dispatch);
        },
    };
}

export const SubjectsTab = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
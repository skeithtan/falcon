import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchSubjectList } from "../../../../utils/subject.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    subjects: state.subject,
});

const mapDispatchToProps = dispatch => ({
    fetchSubjectList() {
        return fetchSubjectList(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);
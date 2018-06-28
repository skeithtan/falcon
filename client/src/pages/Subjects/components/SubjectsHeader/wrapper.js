import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { searchKeywordChanged } from "../../../../redux/actions/subject.actions";
import { styles } from "./styles";


const mapStateToProps = state => ({
    searchKeyword: state.subject.searchKeyword,
});

const mapDispatchToProps = dispatch => ({
    onSearchInputChange(searchKeyword) {
        dispatch(searchKeywordChanged(searchKeyword));
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);

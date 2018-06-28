import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { fetchAllFaculties } from "../../utils/faculty.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    ...state.faculty,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        fetchAllFaculties(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);
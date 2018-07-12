import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { connect } from "react-redux";
import { initiatefetchAllFaculties } from "../../../../../utils/faculty.util";

const mapStateToProps = state => ({
    faculties: state.faculty,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchAllFaculties() {
        initiatefetchAllFaculties(dispatch);
    },
});

export const wrap = compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
);

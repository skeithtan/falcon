import { connect } from "react-redux";
import compose from "recompose/compose";
import { initiatefetchAllFaculties } from "../../../../../utils/faculty.util";


const mapStateToProps = state => ({
    ...state.faculty,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        initiatefetchAllFaculties(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
);
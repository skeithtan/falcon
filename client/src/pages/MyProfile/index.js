import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { facultyListFetchError } from "../../redux/actions/faculty.actions";
import { myProfileFetchError, myProfileIsFetched, myProfileIsLoading } from "../../redux/actions/my_profile.actions";
import { fetchMyProfile } from "../../services/faculty/faculty";
import { MyProfilePage as Component } from "./MyProfile";
import { styles } from "./styles";


const mapStateToProps = state => state.myProfile;

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(myProfileIsLoading());
        return fetchMyProfile()
            .then(result => {
                if (result.data) {
                    dispatch(myProfileIsFetched(result.data.myProfile));
                }

                if (result.errors) {
                    dispatch(myProfileFetchError(result.errors));
                }
            })
            .catch(error => {
                dispatch(facultyListFetchError([error.message]));
            });
    },
});

export const MyProfilePage = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
)(Component);
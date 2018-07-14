import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { styles } from "./styles";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const wrap = compose(
    DragDropContext(HTML5Backend),
    connect(
        mapStateToProps,
        null
    ),
    withRouter,
    withStyles(styles)
);

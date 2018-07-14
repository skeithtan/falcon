import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { DragSource } from "react-dnd";
import { DropTypes } from "../../../../enums/drop_types.enums";

const facultySource = {
    beginDrag: props => ({
        faculty: props.faculty,
    }),
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
});

export const wrap = compose(
    DragSource(DropTypes.FACULTY, facultySource, collect),
    withStyles(styles)
);

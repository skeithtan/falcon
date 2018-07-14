import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import { DropTarget } from "react-dnd";
import { DropTypes } from "../../../../enums/drop_types.enums";

const classScheduleItemTarget = {
    drop(props, monitor) {
        const { onSetFaculty } = props;
        const { faculty } = monitor.getItem();
        onSetFaculty(faculty);
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
});

export const wrap = compose(
    DropTarget(DropTypes.FACULTY, classScheduleItemTarget, collect),
    withStyles(styles)
);

import { activeItem } from "../../../../components/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
export const styles = theme => ({
    facultyListItemContainer: {
        transition: "200ms all",
        padding: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 3,
        background: theme.palette.common.white,

        "&.canDrag:hover": {
            ...activeItem(theme),
            cursor: "grab",
            boxShadow: theme.shadows[2],
            color: theme.palette.primary.main,
        },

        "&.incompatible": {
            opacity: 0.5,
        },

        "&.compatible": {
            ...activeItem(theme),
            background: lighten(theme.palette.primary.light, 0.95),
        },
    },
    facultyName: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    dragDivWrapper: {
        position: "absolute",
        zIndex: -999,
    },
});

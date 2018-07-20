import { activeItem } from "../../../../components/styles";

export const styles = theme => ({
    facultyListItemContainer: {
        transition: "200ms all",
        padding: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 3,

        "&.canDrag:hover": {
            ...activeItem(theme),
            cursor: "grab",
            boxShadow: theme.shadows[2],
            color: theme.palette.primary.main,
        },
    },
    facultyName: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    dragDivWrapper: {
        position: "absolute",
        zIndex: -999
    },
});

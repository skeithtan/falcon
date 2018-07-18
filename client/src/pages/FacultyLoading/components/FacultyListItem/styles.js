import { activeItem } from "../../../../components/styles";

export const styles = theme => ({
    facultyListItemContainer: {
        transition: "200ms all",
        padding: theme.spacing.unit * 2,

        "&.canDrag:hover": {
            ...activeItem(theme),
            cursor: "grab",
            boxShadow: theme.shadows[2],

            "& h3": {
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.primary.main,
            },
        },
    },
});

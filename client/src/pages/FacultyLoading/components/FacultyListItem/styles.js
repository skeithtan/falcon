import { activeItem } from "../../../../components/styles";

export const styles = theme => ({
    facultyListItemContainer: {
        cursor: "grab",
        transition: "200ms all",
        padding: theme.spacing.unit * 2,

        "&:hover": {
            ...activeItem(theme),
            boxShadow: theme.shadows[2],

            "& h3": {
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.primary.main,
            },
        },
    },
});

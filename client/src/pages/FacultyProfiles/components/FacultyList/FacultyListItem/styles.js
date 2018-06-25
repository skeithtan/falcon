import { activeItem, badge } from "../../../../../components/styles";


export const styles = theme => ({
    listItem: {
        transition: "150ms",
    },
    badge: {
        ...badge(theme),
        top: -theme.spacing.unit,
        right: -theme.spacing.unit,
    },
    activeListItem: {
        ...activeItem(theme),

        "& h3": {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.primary.main,
        },
    },
});
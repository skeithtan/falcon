import { activeItem, genericModalStyle } from "../../../../../components/styles";


export default theme => ({
    ...genericModalStyle(theme),
    activeItem: {
        ...activeItem(theme),
    },
    suggestions: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
})
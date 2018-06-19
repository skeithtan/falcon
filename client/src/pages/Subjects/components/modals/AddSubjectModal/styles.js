import { genericModalStyle, activeItem } from "../../../../../components/styles";

export const styles = theme => ({
    ...genericModalStyle(theme),

    selectedFaculty: {
        ...activeItem(theme)
    },
});
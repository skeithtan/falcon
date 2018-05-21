import { genericModalStyle, activeItem } from "../../../../../../../../components/styles";

export default theme => ({
    ...genericModalStyle(theme),

    selectedFaculty: {
        ...activeItem(theme)
    },
})
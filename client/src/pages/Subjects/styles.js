import { page, split } from "../../components/styles";


export const styles = theme => ({
    subjects: page(theme),
    subjectsBody: {
        flexGrow: 1,
        height: "100%",
        minHeight: 0,
    },
    split: split(theme)
});
import { page } from "../../components/styles";


export const styles = theme => ({
    facultyProfiles: page(theme),
    facultyProfilesBody: {
        flexGrow: 1,
        height: "100%",
        minHeight: 0,
    },
    split: {
        display: "grid",
        gridTemplateColumns: "320px auto",
    },
});


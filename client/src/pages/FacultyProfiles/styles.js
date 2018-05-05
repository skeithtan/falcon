export default theme => ({
    facultyProfiles: {
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
    },

    facultyProfilesHeader: {
        background: theme.palette.primary.main,
        minHeight: 52,
        flexGrow: 0,
    },

    facultyProfilesBody: {
        flexGrow: 1,
    },

    split: {
        display: "grid",
        gridTemplateColumns: "minmax(240px, 320px) minmax(320px, 1fr)",
    },

    searchWrapper: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },

    searchInput: {
        padding: 6,
        boxSizing: "border-box",
    },

    tabs: {
        "&:focus": {
            color: "#fff",
        },
    },

    tabsIndicator: {
        background: "white",
    },

    tabSelected: {
        color: "white",
    },
})
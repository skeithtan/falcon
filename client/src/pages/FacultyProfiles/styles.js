export default theme => ({
    facultyProfiles: {
        height: "100%",
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
        height: "100%",
        minHeight: 0,
    },
    split: {
        display: "grid",
        gridTemplateColumns: "minmax(240px, 320px) minmax(320px, 1fr)",
    },
    searchPaper: {
        opacity: 0.85,
        transitionDuration: theme.transitions.duration.short,
        "&:focus-within": {
            opacity: 1,
        },
    },
    searchWrapper: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    searchInput: {
        padding: 6,
        boxSizing: "border-box",
    },
    searchAdornment: {
        opacity: 0.7,
    },
    tabs: {
        color: "white",
        "&:focus": {
            color: "#fff",
        },
    },
    tabsIndicator: {
        background: "white",
    },
})
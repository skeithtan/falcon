export default theme => ({
    facultyProfiles: {
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
    },

    facultyProfilesHeader: {
        background: theme.palette.primary.main,
        minHeight: 56,
        flexGrow: 0,
    },
})
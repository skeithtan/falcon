export const styles = theme => ({
    popperContainer: {
        minWdith: 280,
        maxWidth: 320,
        boxShadow: theme.shadows[10]
    },
    facultyChipWrapper: {
        display: "inline-block",
        maxWidth: "100%",
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: "auto",
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
});
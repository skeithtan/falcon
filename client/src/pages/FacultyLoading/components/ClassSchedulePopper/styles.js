export const styles = theme => ({
    popoverContainer: {
        minWdith: 256,
        maxWidth: 280,
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

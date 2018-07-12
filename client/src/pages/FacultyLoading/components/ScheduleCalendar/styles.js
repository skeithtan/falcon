export const styles = theme => ({
    scheduleCalendarContainer: {
        height: "100%",
    },
    scheduleCalendarBodyContainer: {
        overflowY: "scroll",
        overflowX: "hidden",
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    calendarColumnHead: {
        padding: theme.spacing.unit * 2,
    },
    calendarColumnClassesContainer: {
        minHeight: 400,
        overflowY: "scroll",

        "& > div": {
            minHeight: 1200,
            background: "red",
        },
    },
});

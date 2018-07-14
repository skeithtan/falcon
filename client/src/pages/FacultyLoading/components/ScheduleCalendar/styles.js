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
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
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

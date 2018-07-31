export const styles = theme => ({
    scheduleCalendarContainer: {
        height: "100%",
    },
    scheduleCalendarBodyContainer: {
        overflowY: "auto",
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
        overflowY: "auto",

        "& > div": {
            minHeight: 1200,
            background: "red",
        },
    },
});

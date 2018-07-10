export const styles = theme => ({
    scheduleCalendarContainer: {
        height: 560,

        "& div:not(:last-child)": {
            borderRight: "1px solid",
            borderColor: theme.palette.grey["300"],
        },
    },
    calendarColumnHead: {
        padding: theme.spacing.unit * 2,
    },
});

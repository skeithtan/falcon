export const styles = theme => ({
    appBar: {
        transitionProperty: "background",
        transitionDuration: theme.transitions.duration.shorter,
        boxShadow: theme.shadows[0],
    },
    toolbar: {
        display: "flex",
    },
    hamburger: {
        marginLeft: -20,
    },
    pageTitle: {
        marginRight: "auto",
    },
    falconLogo: {
        display: "inline-block",
        fontSize: 20,
        fontFamily: "Raleway",
        marginRight: 4,
    },
    pageName: {
        display: "inline-block",
        fontSize: 20,
        fontWeight: theme.typography.fontWeightLight,
    },
});
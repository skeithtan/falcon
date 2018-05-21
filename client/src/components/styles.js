export const formContainer = theme => ({
    width: 720,
});

export const form = theme => ({
    padding: theme.spacing.unit,
});

export const pageContainer = theme => ({
    position: "relative",
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,

    // Constrain content to margins
    width: "80%",
    maxWidth: 1200,

    // Center the page container
    marginLeft: "auto",
    marginRight: "auto",
});

export const card = theme => ({
    width: "100%",
});
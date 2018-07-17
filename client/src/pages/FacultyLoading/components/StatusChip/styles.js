import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import Red from "@material-ui/core/colors/red";
import Yellow from "@material-ui/core/colors/yellow";
import Green from "@material-ui/core/colors/green";

export const styles = theme => ({
    yellow: {
        background: lighten(Yellow["100"], 0.3),
        color: darken(Yellow["900"], 0.4),
    },

    green: {
        background: lighten(Green["100"], 0.5),
        color: Green["900"],
    },

    red: {
        background: lighten(Red["100"], 0.5),
        color: Red["900"]
    }
});

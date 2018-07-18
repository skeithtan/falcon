import { lighten, darken } from "@material-ui/core/styles/colorManipulator";
import Amber from "@material-ui/core/colors/amber";
import Green from "@material-ui/core/colors/green";
import Red from "@material-ui/core/colors/red";

export const styles = theme => ({
    yellow: {
        background: lighten(Amber["100"], 0.5),
        color: darken(Amber["900"], 0.4),
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

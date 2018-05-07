import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import FormDisplayListItem from "./FormDisplayListItem";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
)(FormDisplayListItem);

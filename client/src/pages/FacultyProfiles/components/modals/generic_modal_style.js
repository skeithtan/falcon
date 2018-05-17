import { form, formContainer } from "../../../../components/styles";


export default theme => ({
    container: {
        ...formContainer(theme),
    },

    form: {
        ...form(theme),
    },
})
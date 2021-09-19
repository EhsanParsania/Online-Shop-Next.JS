import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#c62828',
        },
        secondary: {
            main: '#2196f3',
        },
        background: {
            default: "#ffffff"
        },
    },
    typography: {
        fontFamily: [
            'IRANYekan',
            'Roboto'
        ].join(','),
    }
});

export default theme;
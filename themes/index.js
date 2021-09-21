import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"
const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: { main: '#3f51b5' },
        // secondary: {
        //     main: '#2196f3',
        // },
        background: {
            default: "#ffffff"
        },
    },
    typography: {
        fontFamily: [
            'IRANYekan',
            'Roboto'
        ].join(','),
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '@font-face': ['IRANYekan'],
                },
            },
        },
    }
});

export default theme;
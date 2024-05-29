import { createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';

export const customTheme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
});

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  shape: { borderRadius: 12 },
  typography: {
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    body2: { lineHeight: 1.4 },
  },
  components: {
    MuiContainer: {
      defaultProps: { disableGutters: true },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
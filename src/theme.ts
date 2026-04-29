import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    borderRadius: 14,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#16a34a", // green
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#94a3b8", // silver
      contrastText: "#0f172a",
    },
    background: {
      default: "#f8fafc", // silver-white
      paper: "#ffffff",   // white
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b", // silver tone
    },
    divider: "rgba(148, 163, 184, 0.35)", // silver divider
    success: {
      main: "#16a34a",
    },
  },
  typography: {
    fontFamily:
      '"Poppins","Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fafc 55%, #eef2f7 100%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(148, 163, 184, 0.35)",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width:1200px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 12,
          minHeight: 40,
        },
        outlined: {
          borderColor: "rgba(148, 163, 184, 0.55)",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#16a34a",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#15803d",
            },
          },
        },
      ],
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.92)",
          borderTop: "1px solid rgba(148, 163, 184, 0.35)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

export default theme;
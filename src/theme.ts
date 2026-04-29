import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#18181b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f4f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#18181b",
      secondary: "#71717a",
    },
    divider: "rgba(0,0,0,0.08)",
    error: {
      main: "#ef4444",
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h4: { fontWeight: 800, letterSpacing: -0.5 },
    h5: { fontWeight: 700, letterSpacing: -0.3 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    body2: { lineHeight: 1.5 },
  },
  components: {
    MuiContainer: {
      defaultProps: { disableGutters: true },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
        },
        outlined: {
          borderColor: "rgba(0,0,0,0.08)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: 0,
          borderRadius: 8,
        },
        contained: {
          "&:hover": { opacity: 0.88 },
        },
        outlined: {
          borderColor: "rgba(0,0,0,0.15)",
          "&:hover": {
            borderColor: "rgba(0,0,0,0.4)",
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.08)",
          transition: "box-shadow 0.18s ease, transform 0.18s ease",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": { borderColor: "rgba(0,0,0,0.12)" },
            "&:hover fieldset": { borderColor: "rgba(0,0,0,0.3)" },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.7rem",
          "&.Mui-selected": {
            color: "#6366f1",
          },
        },
        label: {
          fontWeight: 600,
          "&.Mui-selected": { fontWeight: 700 },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: "12px !important",
          "&::before": { display: "none" },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#e4e4e7",
          color: "#71717a",
          fontWeight: 700,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;

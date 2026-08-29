import { createTheme } from "@mui/material/styles";

// Palette — a lamplit "translator's workbench":
// ink workspace, black navbar, warm paper sheets, amber lamp glow.
const amber = "#e8a33d";
const ink = "#0b0c0e";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: amber, contrastText: "#16130c" },
    background: { default: ink, paper: "#14161a" },
    text: { primary: "#e9e6df", secondary: "#9d998e" },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Manrope", sans-serif',
    h1: {
      fontFamily: '"Fraunces", serif',
      fontWeight: 560,
      letterSpacing: "-0.02em",
    },
    button: { textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: ink },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true, placement: "top" },
      styleOverrides: {
        tooltip: {
          backgroundColor: "#f5f0e4",
          color: "#23201a",
          fontFamily: '"Space Mono", monospace',
          fontSize: "0.68rem",
          letterSpacing: "0.04em",
          fontWeight: 700,
          borderRadius: 6,
          boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
        },
        arrow: { color: "#f5f0e4" },
      },
    },
  },
});

export default theme;

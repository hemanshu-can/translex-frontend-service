import { AppBar, Box, Chip, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import TuneRounded from "@mui/icons-material/TuneRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";

function StatusDot() {
  return (
    <Box
      sx={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        bgcolor: "#63d58f",
        boxShadow: "0 0 0 3px rgba(99,213,143,0.18)",
      }}
    />
  );
}

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#060708",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          maxWidth: 1480,
          width: "100%",
          mx: "auto",
          minHeight: 64,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Wordmark */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexGrow: 1 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "9px",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #e8a33d, #c97c1e)",
              boxShadow: "0 4px 18px rgba(232,163,61,0.35)",
            }}
          >
            <TranslateRounded sx={{ fontSize: 18, color: "#16130c" }} />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Fraunces", serif',
              fontWeight: 620,
              fontSize: "1.22rem",
              letterSpacing: "0.01em",
              color: "#f4f1ea",
            }}
          >
            Translex
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.34)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              display: { xs: "none", sm: "block" },
              mt: "3px",
            }}
          >
            / doc translator
          </Typography>
        </Stack>

        {/* Good-to-have items */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Chip
            size="small"
            label="Auto-detect → English"
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.62rem",
              letterSpacing: "0.06em",
              color: "#d8d4ca",
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              height: 26,
              borderRadius: "7px",
              "& .MuiChip-label": { px: 1.2 },
              display: { xs: "none", md: "inline-flex" },
            }}
          />
          <Tooltip title="LLM ONLINE">
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                px: 1.2,
                py: 0.6,
                borderRadius: "7px",
                bgcolor: "rgba(99,213,143,0.07)",
                border: "1px solid rgba(99,213,143,0.18)",
                cursor: "default",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <StatusDot />
              <Typography
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.62rem",
                  letterSpacing: "0.06em",
                  color: "#63d58f",
                }}
              >
                LLM ready
              </Typography>
            </Stack>
          </Tooltip>
          <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
          <Tooltip title="Recent documents">
            <IconButton
              size="small"
              sx={{
                color: "rgba(255,255,255,0.55)",
                "&:hover": { color: "#e8a33d", bgcolor: "rgba(232,163,61,0.1)" },
              }}
            >
              <HistoryRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              size="small"
              sx={{
                color: "rgba(255,255,255,0.55)",
                "&:hover": { color: "#e8a33d", bgcolor: "rgba(232,163,61,0.1)" },
              }}
            >
              <TuneRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

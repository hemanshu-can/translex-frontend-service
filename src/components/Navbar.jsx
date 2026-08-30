import { useState } from "react";
import { AppBar, Box, Button, Chip, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
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

function Navbar({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const profileOpen = Boolean(anchorEl);

  const openProfile = (event) => setAnchorEl(event.currentTarget);
  const closeProfile = () => setAnchorEl(null);
  const handleSignOut = () => {
    closeProfile();
    onLogout();
  };

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
          <Tooltip title="Reset documents">
            <IconButton
              size="small"
              onClick={() => window.location.reload()}
              sx={{
                color: "rgba(255,255,255,0.55)",
                "&:hover": { color: "#e8a33d", bgcolor: "rgba(232,163,61,0.1)" },
              }}
            >
              <HistoryRounded fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Signed-in user: clicking the profile opens the account menu */}
          {user && (
            <>
              <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
              <Button
                onClick={openProfile}
                disableRipple
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                sx={{
                  p: 0.5,
                  borderRadius: "10px",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "none",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Box
                    component="img"
                    src={user.picture}
                    alt={user.name ?? "Google account"}
                    referrerPolicy="no-referrer"
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  />
                  <Stack sx={{ display: { xs: "none", md: "flex" }, textAlign: "left" }}>
                    <Typography
                      sx={{
                        fontFamily: '"Manrope", sans-serif',
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#ece8df",
                        lineHeight: 1.15,
                        maxWidth: 150,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.name ?? user.email}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: "0.55rem",
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      SIGNED IN
                    </Typography>
                  </Stack>
                  <KeyboardArrowDownRounded
                    sx={{ fontSize: 16, display: { xs: "none", md: "block" } }}
                  />
                </Stack>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={profileOpen}
                onClose={closeProfile}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      minWidth: 190,
                      px: 0.5,
                      py: 0.5,
                      bgcolor: "#0f1113",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "12px",
                      boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={closeProfile}
                  sx={{
                    borderRadius: "8px",
                    py: 0.9,
                    px: 1.2,
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: "0.85rem",
                    color: "#d8d4ca",
                    "&:hover": { bgcolor: "rgba(232,163,61,0.08)", color: "#e8a33d" },
                    "& .MuiListItemIcon-root": { minWidth: 30, color: "rgba(255,255,255,0.45)" },
                  }}
                >
                  <ListItemIcon>
                    <TuneRounded fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider sx={{ my: 0.5, borderColor: "rgba(255,255,255,0.08)" }} />
                <MenuItem
                  onClick={handleSignOut}
                  sx={{
                    borderRadius: "8px",
                    py: 0.9,
                    px: 1.2,
                    fontFamily: '"Manrope", sans-serif',
                    fontSize: "0.85rem",
                    color: "#d8d4ca",
                    "&:hover": { bgcolor: "rgba(255,82,66,0.12)", color: "#ff7d6b" },
                    "& .MuiListItemIcon-root": { minWidth: 30, color: "rgba(255,255,255,0.45)" },
                  }}
                >
                  <ListItemIcon>
                    <LogoutRounded fontSize="small" />
                  </ListItemIcon>
                  Sign out
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

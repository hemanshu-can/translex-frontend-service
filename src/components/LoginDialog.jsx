import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import TranslateRounded from "@mui/icons-material/TranslateRounded";

// Standard Google "G" (4-color) so the button reads as a real Google button.
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

// The login gate: shown over a blurred backdrop whenever the user isn't
// signed in. Intentionally impossible to dismiss — no onClose (which is what
// powers Escape/backdrop-click), disableEscapeKeyDown as belt-and-braces, no
// close icon. The only way out is a successful Google sign-in.
export default function LoginDialog({ error, onLogin }) {
  return (
    <Dialog
      open
      disableEscapeKeyDown
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(6, 7, 8, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          },
        },
        paper: {
          sx: {
            m: 2,
            width: "min(420px, 100%)",
            bgcolor: "#0f1113",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "20px",
            backgroundImage:
              "radial-gradient(420px 220px at 50% -80px, rgba(232,163,61,0.12), transparent)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
            px: { xs: 3, sm: 4 },
            py: 4,
          },
        },
      }}
    >
      <Stack sx={{ alignItems: "center", textAlign: "center" }}>
        {/* Wordmark */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #e8a33d, #c97c1e)",
              boxShadow: "0 4px 18px rgba(232,163,61,0.35)",
            }}
          >
            <TranslateRounded sx={{ fontSize: 19, color: "#16130c" }} />
          </Box>
          <Stack sx={{ textAlign: "left" }}>
            <Typography
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 620,
                fontSize: "1.15rem",
                color: "#f4f1ea",
                lineHeight: 1.1,
              }}
            >
              Translex
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "0.55rem",
                color: "rgba(255,255,255,0.34)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              / doc translator
            </Typography>
          </Stack>
        </Stack>

        <Typography
          component="h2"
          sx={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 560,
            fontSize: "1.5rem",
            color: "#f0ece3",
            letterSpacing: "-0.01em",
            mb: 1,
          }}
        >
          From any language, to English.
        </Typography>
        <Typography sx={{ color: "#9d998e", fontSize: "0.9rem", maxWidth: 300, mb: 3.5 }}>
          Sign in with Google to unlock the workbench.
        </Typography>

        <Button
          onClick={onLogin}
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            fontFamily: '"Manrope", sans-serif',
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#16130c",
            bgcolor: "#ffffff",
            borderRadius: "10px",
            py: 1.3,
            textTransform: "none",
            "&:hover": { bgcolor: "#f2efe8" },
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
          }}
        >
          Continue with Google
        </Button>

        {error && (
          <Typography
            sx={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: "0.82rem",
              color: "#ffb4a8",
              mt: 2,
            }}
          >
            {error}
          </Typography>
        )}

        <Typography
          sx={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.3)",
            mt: 3.5,
            lineHeight: 1.7,
          }}
        >
          FREE FOREVER · YOUR DOCS STAY PRIVATE
          <br />
          PROCESSED, NOT STORED
        </Typography>
      </Stack>
    </Dialog>
  );
}

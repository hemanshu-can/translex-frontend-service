import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";

// Proof-check verdict card — spans the workbench width below the two panels,
// in the slot where the convert button used to sit. Shows the result
// (matched or not), the verifier's confidence, and any notes.
function ProofCheckCard({ proofCheck }) {
  const { matched, confidence, notes } = proofCheck;
  const ok = matched;
  const color = ok ? "#7fd8b0" : "#ff7d6b";

  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "18px",
        bgcolor: "#14161a",
        px: { xs: 2, md: 3 },
        py: 2,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.2 }}>
        {ok ? (
          <CheckCircleRounded sx={{ fontSize: 18, color }} />
        ) : (
          <CancelRounded sx={{ fontSize: 18, color }} />
        )}
        <Typography
          sx={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color,
            fontWeight: 700,
          }}
        >
          Proof check · {ok ? "Matched" : "Not matched"}
        </Typography>
        <Typography
          sx={{
            ml: "auto",
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.68rem",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {confidence}% confidence
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={confidence}
        sx={{
          height: 5,
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.08)",
          "& .MuiLinearProgress-bar": { bgcolor: color },
        }}
      />

      {notes.length > 0 && (
        <Stack spacing={0.7} sx={{ mt: 1.4 }}>
          {notes.map((note, i) => (
            <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
              <Typography
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.72rem",
                  lineHeight: 1.55,
                  color,
                }}
              >
                —
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  color: ok ? "rgba(255,255,255,0.72)" : "#ffb4a8",
                }}
              >
                {note}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default ProofCheckCard;

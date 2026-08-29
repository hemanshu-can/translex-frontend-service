import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

function ConvertButton({ disabled = false, loading = false, onClick }) {
  return (
    <Stack
      spacing={1.4}
      sx={{ alignItems: "center", py: { xs: 1, md: 0 }, px: { xs: 0, md: 1 } }}
    >
      <Button
        onClick={onClick}
        disabled={disabled || loading}
        className={!disabled && !loading ? "glow-pulse" : undefined}
        variant="contained"
        sx={{
          minWidth: 0,
          borderRadius: "999px",
          px: { xs: 3.5, md: 3.2 },
          py: 1.6,
          background: "linear-gradient(135deg, #e8a33d, #cf8524)",
          color: "#16130c",
          boxShadow: "0 10px 40px rgba(232,163,61,0.3)",
          transition: "transform .2s ease, filter .2s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #f0b256, #dd9530)",
            transform: "translateY(-2px) scale(1.03)",
            filter: "brightness(1.05)",
          },
          "&:active": { transform: "translateY(0) scale(0.98)" },
          "&.Mui-disabled": {
            bgcolor: "rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.28)",
            boxShadow: "none",
          },
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          {loading ? (
            <CircularProgress size={18} thickness={5} sx={{ color: "#16130c" }} />
          ) : (
            <ArrowForwardRounded sx={{ fontSize: 20 }} />
          )}
          <Typography
            sx={{
              fontFamily: '"Fraunces", serif',
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "1.08rem",
              lineHeight: 1,
            }}
          >
            {loading ? "Translating" : "Convert to English"}
          </Typography>
        </Stack>
      </Button>
      <Typography
        sx={{
          fontFamily: '"Space Mono", monospace',
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.32)",
          textAlign: "center",
        }}
      >
        {disabled ? "upload a document first" : "extracted → english"}
      </Typography>
    </Stack>
  );
}

export default ConvertButton;

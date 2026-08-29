import { useMemo, useState } from "react";
import { Box, CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import ContentCopyRounded from "@mui/icons-material/ContentCopyRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";

function Panel({
  eyebrow,
  title,
  accent = "#e8a33d",
  value,
  onChange,
  readOnly = false,
  loading = false,
  placeholder = "Nothing here yet…",
}) {
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = value.length;
    const words = value.trim().split(/\s+/).filter(Boolean).length;
    return { chars, words };
  }, [value]);

  const copy = async () => {
    if (!value.trim()) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: 0,
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "18px",
        overflow: "hidden",
        bgcolor: "#14161a",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        transition: "border-color .25s ease, transform .25s ease",
        "&:hover": { borderColor: "rgba(255,255,255,0.16)" },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", px: { xs: 1.5, sm: 2 }, py: 1.4 }}
      >
        <Box sx={{ width: 3, height: 34, borderRadius: 2, bgcolor: accent, flexShrink: 0 }} />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: accent,
              fontWeight: 700,
            }}
          >
            {eyebrow}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Fraunces", serif',
              fontStyle: "italic",
              fontWeight: 540,
              fontSize: "1.12rem",
              color: "#f0ece3",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Box>

        {stats.chars > 0 && (
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.04em",
              display: { xs: "none", sm: "block" },
            }}
          >
            {stats.words.toLocaleString()} words · {stats.chars.toLocaleString()} chars
          </Typography>
        )}

        <Tooltip title={copied ? "Copied" : "Copy text"}>
          <span>
            <IconButton
              size="small"
              onClick={copy}
              disabled={!value.trim()}
              sx={{
                color: copied ? accent : "rgba(255,255,255,0.5)",
                "&:hover": { color: accent, bgcolor: "rgba(232,163,61,0.1)" },
                "&.Mui-disabled": { color: "rgba(255,255,255,0.16)" },
              }}
            >
              {copied ? <CheckRounded fontSize="small" /> : <ContentCopyRounded fontSize="small" />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>

      {/* Paper sheet */}
      <Box sx={{ position: "relative", flexGrow: 1, minHeight: 0 }}>
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          className="paper-scroll"
          style={{
            width: "100%",
            height: "100%",
            minHeight: 440,
            resize: "vertical",
            boxSizing: "border-box",
            border: "none",
            outline: "none",
            background: "linear-gradient(180deg, #f6f1e5, #f2ecdd)",
            color: "#26221a",
            fontFamily: '"Lora", serif',
            fontSize: "1.02rem",
            lineHeight: 1.75,
            padding: "26px 26px",
          }}
        />
        {!value && !loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              pointerEvents: "none",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Fraunces", serif',
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(38,34,26,0.35)",
              }}
            >
              {placeholder}
            </Typography>
          </Box>
        )}

        {/* Loading veil */}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              bgcolor: "rgba(13,14,16,0.72)",
              backdropFilter: "blur(3px)",
              zIndex: 2,
            }}
          >
            <CircularProgress size={34} thickness={4} sx={{ color: accent }} />
            <Typography
              sx={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "0.66rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Working…
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Panel;

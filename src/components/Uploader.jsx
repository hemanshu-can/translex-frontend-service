import { useRef, useState } from "react";
import { Box, Chip, Stack, Typography, IconButton, Tooltip } from "@mui/material";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import FileOpenRounded from "@mui/icons-material/FileOpenRounded";

const ACCEPTED = ".pdf,.jpg,.jpeg,.png,.tif,.tiff";

function formatSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileBadge({ file, onClear }) {
  const isImage = file.type.startsWith("image/");
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        alignItems: "center",
        width: "100%",
        border: "1px solid rgba(232,163,61,0.35)",
        bgcolor: "rgba(232,163,61,0.07)",
        borderRadius: 2,
        px: { xs: 1.5, sm: 2 },
        py: 1.5,
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "10px",
          display: "grid",
          placeItems: "center",
          bgcolor: "rgba(232,163,61,0.14)",
          flexShrink: 0,
        }}
      >
        {isImage ? (
          <ImageRounded sx={{ fontSize: 20, color: "#e8a33d" }} />
        ) : (
          <DescriptionRounded sx={{ fontSize: 20, color: "#e8a33d" }} />
        )}
      </Box>
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography
          noWrap
          sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#ece8df" }}
        >
          {file.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.66rem",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.05em",
          }}
        >
          {file.type.toUpperCase().split("/")[1] || "FILE"} · {formatSize(file.size)}
        </Typography>
      </Box>
      <Tooltip title="Remove">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          sx={{
            color: "rgba(255,255,255,0.5)",
            "&:hover": { color: "#ff7d6b", bgcolor: "rgba(255,125,107,0.1)" },
          }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

function Uploader({ file, onFile, onClear }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const pick = () => inputRef.current?.click();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) onFile(dropped);
  };

  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={pick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pick();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      sx={{
        cursor: "pointer",
        outline: "none",
        border: dragging
          ? "1.5px dashed #e8a33d"
          : "1.5px dashed rgba(255,255,255,0.16)",
        bgcolor: dragging ? "rgba(232,163,61,0.05)" : "transparent",
        backgroundImage: dragging
          ? "radial-gradient(1200px 300px at 50% -80%, rgba(232,163,61,0.07), transparent)"
          : "linear-gradient(180deg, rgba(255,255,255,0.02), transparent), radial-gradient(1200px 300px at 50% -80%, rgba(232,163,61,0.07), transparent)",
        borderRadius: "18px",
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 4 },
        transition: "border-color .25s ease, background-color .25s ease",
        "&:hover, &:focus-visible": {
          borderColor: "rgba(232,163,61,0.65)",
          bgcolor: "rgba(232,163,61,0.04)",
        },
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      {file ? (
        <FileBadge file={file} onClear={onClear} />
      ) : (
        <Stack spacing={1.25} sx={{ alignItems: "center", textAlign: "center" }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "16px",
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(232,163,61,0.12)",
              border: "1px solid rgba(232,163,61,0.25)",
            }}
          >
            <FileOpenRounded sx={{ fontSize: 26, color: "#e8a33d" }} />
          </Box>
          <Typography sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#ece8df" }}>
            Drop your document or image
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", color: "#9d998e", maxWidth: 420 }}>
            PDF, JPG, PNG or TIFF — we extract every word, then hand it to the LLM.
          </Typography>
          <Chip
            label="Browse files"
            onClick={pick}
            sx={{
              mt: 1,
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#16130c",
              fontWeight: 700,
              bgcolor: "#e8a33d",
              borderRadius: "8px",
              px: 0.5,
              "&:hover": { bgcolor: "#f0b256" },
            }}
          />
        </Stack>
      )}
    </Box>
  );
}

export default Uploader;

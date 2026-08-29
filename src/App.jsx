import { useState } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import Uploader from "./components/Uploader";
import SourcePanel from "./components/SourcePanel";
import ResultPanel from "./components/ResultPanel";
import ConvertButton from "./components/ConvertButton";
import { extractText } from "./api/ocr";
import { translateToEnglish } from "./api/translate";
import useRequest from "./hooks/useRequest";

const STEPS = [
  { n: "01", label: "Upload" },
  { n: "02", label: "Extract" },
  { n: "03", label: "Convert" },
];

function StepsStrip({ activeCount }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      {STEPS.map((step, i) => {
        const active = i < activeCount;
        return (
          <Stack key={step.n} direction="row" spacing={1} sx={{ alignItems: "center" }}>
            {i > 0 && (
              <Box
                sx={{
                  width: 26,
                  height: 1,
                  bgcolor: active ? "rgba(232,163,61,0.5)" : "rgba(255,255,255,0.12)",
                }}
              />
            )}
            <Stack
              direction="row"
              spacing={0.8}
              sx={{
                alignItems: "center",
                px: 1.1,
                py: 0.55,
                borderRadius: "8px",
                border: `1px solid ${active ? "rgba(232,163,61,0.4)" : "rgba(255,255,255,0.08)"}`,
                bgcolor: active ? "rgba(232,163,61,0.08)" : "transparent",
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.62rem",
                  color: active ? "#e8a33d" : "rgba(255,255,255,0.3)",
                }}
              >
                {step.n}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: active ? "#ece8df" : "rgba(255,255,255,0.32)",
                }}
              >
                {step.label}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}

function App() {
  const [file, setFile] = useState(null);
  const [extracted, setExtracted] = useState("");
  const [translated, setTranslated] = useState("");
  const [errorDismissed, setErrorDismissed] = useState(false);

  // One request hook per backend call — see src/api and src/hooks/useRequest.js.
  const ocr = useRequest(extractText);
  const translate = useRequest(translateToEnglish);

  // Errors are surfaced through the hooks and rendered in the banner below.
  const error = ocr.error ?? translate.error;

  // Upload → extract text. A stale translation from a previous document is
  // cleared along with any dismissed error.
  const handleFile = async (f) => {
    setFile(f);
    setTranslated("");
    setErrorDismissed(false);
    try {
      const res = await ocr.run(f);
      setExtracted(res?.text ?? "");
    } catch {
      /* failure is already recorded in ocr.error */
    }
  };

  // Convert → LLM translation of the extracted text.
  const handleConvert = async () => {
    if (!extracted.trim()) return;
    setErrorDismissed(false);
    try {
      const res = await translate.run(extracted);
      setTranslated(res?.text ?? "");
    } catch {
      /* failure is already recorded in translate.error */
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setExtracted("");
    setTranslated("");
    setErrorDismissed(false);
    ocr.reset();
    translate.reset();
  };

  const activeSteps =
    1 + (extracted.trim() ? 1 : 0) + (translated.trim() ? 1 : 0);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#0b0c0e" }}>
      <Navbar />

      <Box
        component="main"
        sx={{
          width: "100%",
          maxWidth: 1480,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: { xs: 4, md: 6 },
          pb: 10,
          flexGrow: 1,
          backgroundImage:
            "radial-gradient(1100px 420px at 50% -140px, rgba(232,163,61,0.07), transparent)",
        }}
      >
        {/* Hero row */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          className="rise"
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            mb: 6,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#e8a33d",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Document workbench
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontWeight: 560,
                fontSize: { xs: "1.9rem", sm: "2.4rem", md: "2.7rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: "#f0ece3",
              }}
            >
              From any language,{" "}
              <Box component="span" sx={{ fontStyle: "italic", color: "#e8a33d" }}>
                to English.
              </Box>
            </Typography>
            <Typography sx={{ color: "#9d998e", mt: 1.2, maxWidth: 560, fontSize: "0.95rem" }}>
              Upload a PDF or an image — we extract every word, then an LLM writes
              it out in English. Review, copy, and go.
            </Typography>
          </Box>
          <StepsStrip activeCount={activeSteps} />
        </Stack>

        {/* Uploader */}
        <Box className="rise" sx={{ animationDelay: "0.08s" }}>
          <Uploader
            file={file}
            onFile={handleFile}
            onClear={handleClearFile}
          />
        </Box>

        {/* Error banner */}
        {error && !errorDismissed && (
          <Alert
            severity="error"
            onClose={() => setErrorDismissed(true)}
            sx={{
              mt: 3,
              borderRadius: "12px",
              fontFamily: '"Manrope", sans-serif',
              fontSize: "0.85rem",
              bgcolor: "rgba(255,82,66,0.1)",
              color: "#ffb4a8",
              border: "1px solid rgba(255,82,66,0.3)",
              "& .MuiAlert-icon": { color: "#ff7d6b" },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Workbench: source (left) — convert — result (right) */}
        <Box
          className="rise"
          sx={{
            animationDelay: "0.16s",
            mt: 4,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          <SourcePanel value={extracted} onChange={setExtracted} loading={ocr.loading} />
          <ResultPanel value={translated} loading={translate.loading} />
          <Box sx={{ gridColumn: "1 / -1", justifySelf: "center", mt: { xs: 1, md: 2 } }}>
            <ConvertButton
              disabled={!extracted.trim() || ocr.loading}
              loading={translate.loading}
              onClick={handleConvert}
            />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          py: 2.5,
          px: { xs: 2, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            maxWidth: 1480,
            mx: "auto",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            TRANSEX — AI DOCUMENT TRANSLATION
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: "0.62rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.24)",
            }}
          >
            EXTRACT · TRANSLATE · COPY
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default App;

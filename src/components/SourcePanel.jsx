import Panel from "./Panel";

// Left pane — the text extracted from the uploaded document. Read-only: the
// /convert call sends the original OCR pages, so the source box must match
// what gets translated (no silent divergence after manual edits).
function SourcePanel({ value, loading }) {
  return (
    <Panel
      eyebrow="Source · Extracted"
      title="Original text"
      accent="#e8a33d"
      value={value}
      readOnly
      loading={loading}
      placeholder="Extracted text will appear here…"
    />
  );
}

export default SourcePanel;

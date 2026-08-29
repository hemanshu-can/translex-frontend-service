import Panel from "./Panel";

// Left pane — the text extracted from the uploaded document.
function SourcePanel({ value, onChange, loading }) {
  return (
    <Panel
      eyebrow="Source · Extracted"
      title="Original text"
      accent="#e8a33d"
      value={value}
      onChange={onChange}
      loading={loading}
      placeholder="Extracted text will appear here…"
    />
  );
}

export default SourcePanel;

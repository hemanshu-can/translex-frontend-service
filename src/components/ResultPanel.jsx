import Panel from "./Panel";

// Right pane — the LLM's English translation of the extracted text.
function ResultPanel({ value, loading }) {
  return (
    <Panel
      eyebrow="Target · English"
      title="Translation"
      accent="#7fd8b0"
      value={value}
      readOnly
      loading={loading}
      placeholder="Your English translation will appear here…"
    />
  );
}

export default ResultPanel;

import api from "./client";

// POST /convert — sends the extracted text to the backend, which hands it to
// the LLM (DeepSeek) and returns the English translation.
// Body: { text }, response: { text }.
export function translateToEnglish(text) {
  return api("/convert", {
    method: "POST",
    body: { text },
  });
}

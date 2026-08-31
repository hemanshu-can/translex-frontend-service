import api from "./client";

// POST /convert — sends the extracted pages to the backend, which hands them
// to the LLM (DeepSeek) and returns the English translation.
// Body: { pages: [{ pageNumber, text }] } (same shape /ocr returns),
// response: { pages: [{ pageNumber, text }], proofCheck: { matched, confidence, notes } }.
export function translateToEnglish(pages) {
  return api("/convert", {
    method: "POST",
    body: { pages },
  });
}

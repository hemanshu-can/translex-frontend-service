import api from "./client";

// POST /api/ocr — extracts text from a PDF or image.
// The multer field name is "file" (matches the backend's @UploadedFile("file")).
// Returns { text }.
export function extractText(file) {
  const form = new FormData();
  form.append("file", file);
  return api("/ocr", { method: "POST", body: form, isForm: true });
}

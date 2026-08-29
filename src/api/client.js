import axios from "axios";

// The client calls the backend directly (no Vite proxy). The backend
// (Express + routing-controllers) runs on :3000; the Vite dev server is a
// different origin, so the backend must send CORS headers for the browser to
// accept these calls — see backend/src/index.ts (app.use(cors())).
// Override the target with VITE_API_BASE_URL if the backend moves.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

const http = axios.create({ baseURL: BASE_URL });

// Contract with the backend (routing-controllers): errors arrive as
// { error: string } (or { message }), successes as plain JSON bodies.
async function api(path, { method = "GET", body, isForm = false } = {}) {
  try {
    const res = await http.request({
      url: path,
      method,
      // axios sets the multipart boundary itself for FormData — only set
      // Content-Type explicitly for JSON payloads.
      headers: isForm ? undefined : { "Content-Type": "application/json" },
      data: body,
    });
    return res.data;
  } catch (err) {
    if (!err.response) {
      // No HTTP response at all (backend down, CORS blocked, etc.)
      throw new Error(`Could not reach the API server at ${BASE_URL}. Is the backend running?`);
    }
    const data = err.response.data ?? {};
    throw new Error(
      data.error ?? data.message ?? `Request failed (${err.response.status})`
    );
  }
}

export default api;

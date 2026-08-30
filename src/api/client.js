import axios from "axios";

// The client calls the backend directly (no Vite proxy). The backend
// (Express + routing-controllers) runs on :3000; the Vite dev server is a
// different origin, so the backend must send CORS headers for the browser to
// accept these calls — see backend/src/index.ts (app.use(cors())).
// Override the target with VITE_API_BASE_URL if the backend moves.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://translex-backend-service.onrender.com";

// The auth JWT is an HttpOnly cookie set by the backend on the OAuth
// callback. `withCredentials` makes the browser attach that cookie to every
// cross-origin request (frontend :3001 -> backend :3000) — no manual auth
// header is needed. The backend must answer with CORS credentials
// (cors({ origin, credentials: true })), or the browser blocks these requests.
const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Registered by App (see App.jsx) so an expired/revoked session can drop the
// user and re-open the login gate.
let onUnauthorized = null;
export function setOnUnauthorized(fn) {
  onUnauthorized = fn;
}

// A 401 means the session is missing, expired or revoked — tell the app to
// re-open the login gate. The error still propagates to the caller so the
// request hook can surface it in the UI banner.
http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      onUnauthorized?.();
    }
    return Promise.reject(err);
  }
);

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

export { BASE_URL };
export default api;

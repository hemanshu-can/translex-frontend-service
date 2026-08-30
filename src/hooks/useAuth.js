import { useCallback, useEffect, useRef, useState } from "react";
import api, { BASE_URL } from "../api/client";

// Google OAuth via the backend, with the session token kept in an HttpOnly
// cookie that JavaScript never sees:
//   1. login() navigates the browser to GET /auth/google (a full page
//      navigation — the browser follows the 302 chain to Google's consent
//      screen; CORS doesn't apply to top-level navigations).
//   2. The backend callback sets the cookie and 302-redirects back to
//      FRONTEND_URL (or ?error=access_denied on failure).
//   3. On mount this hook asks GET /auth/me — the browser attaches the cookie
//      automatically (withCredentials), the backend verifies it, and the
//      response decides whether to show the login gate or the workbench.
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Whether we hold a live session. Lets logout() skip the backend call when
  // the initial /auth/me 401 (an expected "not signed in") flows through the
  // global onUnauthorized handler.
  const authedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Failure redirect from the backend (user cancelled on Google's screen).
    if (params.get("error")) {
      setError("Sign-in was cancelled or failed. Please try again.");
      window.history.replaceState({}, "", window.location.pathname);
    }

    let cancelled = false;
    api("/auth/me")
      .then((me) => {
        if (cancelled) return;
        authedRef.current = true;
        setUser(me);
      })
      .catch((e) => {
        // A 401 simply means "not signed in" — the gate will show with no
        // noise. Only surface it if the backend itself couldn't be reached.
        if (e instanceof Error && e.message.startsWith("Could not reach")) {
          setError(e.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(() => {
    window.location.assign(new URL("/auth/google", BASE_URL).toString());
  }, []);

  const logout = useCallback(() => {
    // Clear the HttpOnly cookie server-side, then drop the client state.
    // Skipped when there was never a session (the /auth/me 401 path above).
    if (authedRef.current) {
      authedRef.current = false;
      api("/auth/logout", { method: "POST" }).catch(() => {});
    }
    setUser(null);
  }, []);

  return { authed: !!user, user, error, login, logout, loading };
}

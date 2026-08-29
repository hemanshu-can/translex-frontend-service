import { useCallback, useState } from "react";

// Generic async-request hook: wraps any api service function with
// data / loading / error state, so components never manage fetch state.
//
//   const { data, loading, error, run, reset } = useRequest(extractText);
//   run(file).then((res) => setExtracted(res.text));
//
// - `run` returns the parsed response and rethrows on failure (error is
//   also stored in `error`); callers may catch, or ignore and read `error`.
// - `reset` clears stored error/data (e.g. on file removal).
export default function useRequest(fn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fn(...args);
        setData(res);
        return res;
      } catch (e) {
        const message = e instanceof Error ? e.message : "Something went wrong";
        setError(message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, run, reset };
}

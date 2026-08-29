import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Dev server port — the backend owns :3000, so the frontend must use
    // another port. No proxy: the client calls the backend directly (CORS).
    port: 3001,
  },
});

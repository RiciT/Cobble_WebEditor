import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",
  plugins: [react()],
  server: {
    port: 8081,
    open: true,
  }
});

/*    proxy: {
      '/run': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false
      }
    }*/
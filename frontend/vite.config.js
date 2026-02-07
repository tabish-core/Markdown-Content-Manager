import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // Add this line

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // This forces EVERYTHING to use the same React instance
      react: path.resolve(__filename, "../node_modules/react"),
      "react-dom": path.resolve(__filename, "../node_modules/react-dom"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
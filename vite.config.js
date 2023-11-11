import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

dotenv.config();

export default defineConfig({
  plugins: [VitePWA({ registerType: "autoUpdate" }), react()],
});

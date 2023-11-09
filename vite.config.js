import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react-swc";

dotenv.config();
export default defineConfig({
  plugins: [react()],
});

import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config();

dotenv.config();
export default defineConfig({
  plugins: [react()],
});

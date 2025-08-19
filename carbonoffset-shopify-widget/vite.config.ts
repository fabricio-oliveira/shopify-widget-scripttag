import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

export default defineConfig({
	plugins: [preact()],
	build: {
		outDir: "../backend/src/app/public/widget",
		rollupOptions: {
			input: path.resolve(__dirname, "src/index.tsx"),
			output: {
				entryFileNames: "bundle.js",
				chunkFileNames: "[name]-[hash].js",
				assetFileNames: "[name]-[hash][extname]",
			},
		},
	},
});
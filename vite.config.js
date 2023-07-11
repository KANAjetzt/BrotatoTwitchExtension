import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	build: {
		rollupOptions: {
				input: {
						video_overlay: resolve("video_overlay.html"),
						config: resolve("config.html"),
				},
		},
		assetsDir: "app",
},
base: "./",
plugins: [svelte()],
});

import { resolve } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";

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
plugins: [sveltekit()],
});

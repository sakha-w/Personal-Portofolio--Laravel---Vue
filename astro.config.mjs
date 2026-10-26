import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    publicDir: "./src/public",
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    integrations: [vue()],
    vite: {
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        plugins: [tailwindcss()],
        server: {
            hmr: { clientPort: Number(process.env.HTTP_PORT || 8000) },
            watch: {
                ignored: ["**/node_modules/**", "**/vendor/**", "**/dist/**", "**/.astro/**", "**/.git/**", "**/storage/**"],
                usePolling: true,
                interval: 1000,
            },
        },
    },
    server: {
        port: 4321,
        host: true,
    },
});

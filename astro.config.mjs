import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
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
    },
    server: {
        port: 4321,
        host: true,
        watch: {
            ignored: [
                "**/node_modules/**",
                "**/.git/**",
                "**/storage/**",
                "**/public/build/**",
            ],
            usePolling: true,
            interval: 1000,
        },
    },
});

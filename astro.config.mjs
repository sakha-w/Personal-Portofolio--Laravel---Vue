import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [vue()],
  server: {
    port: 4321,
    host: true
  }
});

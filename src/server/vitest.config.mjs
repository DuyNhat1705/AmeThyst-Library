import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    api: {
      host: '127.0.0.1',
      port: 8080,
    },
  },
});
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Bật cái này để nhận diện describe, test, expect giống Jest
  },
});
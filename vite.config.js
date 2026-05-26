import { resolve } from 'path';

import { defineConfig } from 'vite';

export default defineConfig({

  build: {

    rollupOptions: {

      input: {

        main: resolve(
          __dirname,
          'index.html'
        ),

        recipe: resolve(
          __dirname,
          'src/recipe/index.html'
        ),

        favorites: resolve(
          __dirname,
          'src/favorites/index.html'
        ),
      },
    },
  },
});
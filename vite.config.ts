import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      config: path.resolve(__dirname, './src/config'),
      contexts: path.resolve(__dirname, './src/contexts'),
      eventEmitter: path.resolve(__dirname, './src/eventEmitter'),
      hooks: path.resolve(__dirname, './src/hooks'),
      i18n: path.resolve(__dirname, './src/i18n'),
      layout: path.resolve(__dirname, './src/layout'),
      navigation: path.resolve(__dirname, './src/navigation'),
      providers: path.resolve(__dirname, './src/providers'),
      screens: path.resolve(__dirname, './src/screens'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            if (id.includes('draft-js')) {
              return 'vendor_draft';
            } else if (id.includes('chakra-ui')) {
              return 'vendor_chakra';
            } else if (id.includes('framer-motion')) {
              return 'vendor_framer';
            } else if (id.includes('date-fns')) {
              return 'vendor_date-fns';
            } else if (id.includes('auth0')) {
              return 'vendor_auth0';
            } else if (id.includes('immutable')) {
              return 'vendor_immutable';
            } else if (id.includes('i18next')) {
              return 'vendor_i18next';
            }

            return 'vendor';
          }
        },
      },
    },
  },
});

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
            } else if (id.includes('axios')) {
              return 'vendor_axios';
            } else if (id.includes('framer-motion')) {
              return 'vendor_framer';
            } else if (id.includes('socket.io')) {
              return 'vendor_socketio';
            } else if (id.includes('lodash')) {
              return 'vendor_lodash';
            } else if (id.includes('react-icons')) {
              return 'vendor_react-icons';
            } else if (id.includes('emotion')) {
              return 'vendor_emotion';
            } else if (id.includes('date-fns')) {
              return 'vendor_date-fns';
            }

            return 'vendor';
          }
        },
      },
    },
  },
});

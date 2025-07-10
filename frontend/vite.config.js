import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // Fix for date-fns v3 compatibility with @mui/x-date-pickers
      'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
      // Project aliases
      '@': path.resolve(__dirname, './src'),
      // Add any other necessary aliases here
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@apollo/client',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      'graphql',
      '@mui/x-date-pickers',
    ],
    exclude: ['@mui/x-date-pickers/AdapterDateFns'],
    esbuildOptions: {
      // Ensure date-fns is treated as ESM
      preserveSymlinks: true,
      // Ensure date-fns is treated as ESM
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    // Force dependency pre-bundling
    force: true,
  },
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Use React 17+ automatic JSX transform
      jsxRuntime: 'automatic',
      // Enable React strict mode
      strictMode: true,
      // Handle React import automatically
      jsxImportSource: '@emotion/react',
      // Babel plugin for Emotion
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    // Enable CORS for development
    cors: true,
    // Handle SPA fallback
    fs: {
      strict: false,
    },
  },
  define: {
    // Polyfill for process.env
    'process.env': {},
    // Global constant for environment
    __APP_ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  // Build configuration
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          apollo: ['@apollo/client', 'graphql'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
});

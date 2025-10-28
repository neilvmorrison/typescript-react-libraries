import { defineConfig } from 'tsup';

// Configuration for tsup, our fast bundler, to create the distributable library files.
export default defineConfig({
  // Entry point for the build (e.g., packages/my-components/src/index.ts)
  entry: ['src/index.ts'],

  // Output formats: CJS (CommonJS) for Node/older environments, and ESM (ES Modules) for modern environments.
  format: ['cjs', 'esm'],

  // Clean the 'dist' folder before building
  clean: true,

  // Generate TypeScript declaration files (critical for type safety when consuming the library)
  dts: true,

  // Exclude 'react' from the bundle, as it's a peer dependency that the consuming app (Nextra/user's app) must provide.
  external: ['react'],

  // Ensure the build process supports React's JSX/TSX
  target: 'es2022',

  // Don't minify the code. Many libraries prefer un-minified code for better tree-shaking in the consuming app.
  minify: false,
});

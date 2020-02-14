import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// UMD build (for browsers)
export default {
  input: 'src/index.ts',
  output: {
    name: 'ne_dom',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    typescript()
  ]
};
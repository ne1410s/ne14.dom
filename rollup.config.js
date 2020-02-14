import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [

  { // UMD build (for browsers)
    input: 'src/index.ts',
    output: {
      name: 'ne_dom',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      typescript()
    ]
  },

  { // CommonJS (for Node) and ES module (for bundlers) builds
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript()
    ]
  }
];
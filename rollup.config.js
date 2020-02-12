import pkg from './package.json';

export default [

  { // UMD build (for browsers)
    input: 'dist/index.js',
    output: {
      name: 'ne14',
      file: pkg.browser,
      format: 'umd'
    }
  },

  { // CommonJS (for Node) and ES module (for bundlers) builds
    input: 'dist/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
];
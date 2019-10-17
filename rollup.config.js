// rollup.config.js
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'es',
      sourceMap: true
    }
  ],
  plugins: [
    autoExternal(),
    commonjs(),
    eslint(),
    babel(babelrc({
      addExternalHelpersPlugin: false
    }))
  ],
  external: [
    'vue'
  ]
};
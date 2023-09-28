import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    // input: 'src/components/buttons/index.ts',
    input: 'src/components/inputs/index.ts',
    output: [
      // {
      //   file: 'components/buttons.js',
      //   format: 'esm',
      //   sourcemap: true
      // },

      {
        file: 'components/inputs.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({ plugins: [], extract: true })
    ]
  },
  // {
  //   input: 'components/types/components/buttons/index.d.ts',
  //   output: [{ file: 'components/buttons.d.ts', format: 'esm' }],
  //   plugins: [dts(), resolve()],
  //   external: [/\.css$/]
  // },

  {
    input: 'components/types/components/inputs/index.d.ts',
    output: [{ file: 'components/inputs.d.ts', format: 'esm' }],
    plugins: [dts(), resolve()],
    external: [/\.css$/]
  }
];

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/components/buttons/index.ts',
    output: [
      {
        file: 'components/buttons.js',
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

  {
    input: 'src/utils/index.ts',
    output: [
      {
        file: 'utils/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },

  {
    input: 'components/types/components/buttons/index.d.ts',
    output: [{ file: 'components/buttons.d.ts', format: 'esm' }],
    plugins: [dts(), resolve()],
    external: [/\.css$/]
  },

  {
    input: 'utils/types/utils/index.d.ts',
    output: [{ file: 'utils/index.d.ts', format: 'esm' }],
    plugins: [dts(), resolve()]
  }
];

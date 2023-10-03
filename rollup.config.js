import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const buildSections = [
  { input: 'src/components/buttons/index.ts', output: 'components/buttons.js' },
  { input: 'src/components/inputs/index.ts', output: 'components/inputs.js' },
  { input: 'src/icons/index.ts', output: 'icons/inputs.js' },
  { input: 'src/widgets/cards/index.ts', output: 'widgets/cards.js' },
  { input: 'src/utils/index.ts', output: 'utils/index.js' }
];

const buildDefinitions = [
  { input: 'components/types/components/buttons/index.d.ts', output: 'components/buttons.d.ts' },
  { input: 'components/types/components/inputs/index.d.ts', output: 'components/inputs.d.ts' },
  { input: 'components/types/icons/index.d.ts', output: 'icons/inputs.d.ts' },
  { input: 'widgets/types/widgets/cards/index.d.ts', output: 'widgets/cards.d.ts' },
  { input: 'utils/types/utils/index.d.ts', output: 'utils/index.d.ts' }
];

export default [
  ...buildSections.map(({ input, output }) => ({
    input,
    output: [
      {
        file: output,
        format: 'esm',
        sourcemap: false
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({ plugins: [], extract: true })
    ]
  })),

  ...buildDefinitions.map(({ input, output }) => ({
    input,
    output: [{ file: output, format: 'esm' }],
    plugins: [dts(), resolve()],
    external: [/\.css$/]
  }))
];

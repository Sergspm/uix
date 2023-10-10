import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const buildSections = [
  { input: 'src/components/buttons/index.ts', output: 'components/buttons.js' },
  { input: 'src/components/inputs/index.ts', output: 'components/inputs.js' },
  { input: 'src/components/testimonials/index.ts', output: 'components/testimonials.js' },
  { input: 'src/features/market/index.ts', output: 'features/market.js' },
  { input: 'src/icons/index.ts', output: 'icons/index.js' },
  { input: 'src/widgets/cards/index.ts', output: 'widgets/cards.js' },
  { input: 'src/utils/index.ts', output: 'utils/index.js' }
];

const buildDefinitions = [
  {
    input: 'components/types/components/buttons/index.d.ts',
    output: 'components/buttons.d.ts'
  },
  {
    input: 'components/types/components/inputs/index.d.ts',
    output: 'components/inputs.d.ts'
  },
  {
    input: 'components/types/components/testimonials/index.d.ts',
    output: 'components/testimonials.d.ts'
  },
  {
    input: 'features/types/features/market/index.d.ts',
    output: 'features/market.d.ts'
  },
  { input: 'components/types/icons/index.d.ts', output: 'icons/index.d.ts' },
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
    ],
    external: ['react', 'react-dom']
  })),

  ...buildDefinitions.map(({ input, output }) => ({
    input,
    output: [{ file: output, format: 'esm' }],
    plugins: [dts(), resolve()],
    external: [/\.css$/, 'react', 'react-dom']
  }))
];

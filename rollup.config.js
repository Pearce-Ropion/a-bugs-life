import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import json from 'rollup-plugin-json';

import { description, version } from './package.json';

export default {
    input: 'app/index.js',
    output: {
        dir: 'dist',
        file: 'bundle.js',
        format: 'es',
        banner: '/*'.concat(description, ' v', version, ' */'),
        globals: {
            react: 'React',
            'react-dom': 'ReactDom',
        },
        sourceMap: true,
        sourceMapFile: './dist/bundle.js.map',
    },
    plugins: [
        babel({
            exclude: ['node_modules/**', 'src/styles/*'],
        }),
        postcss({
            modules: true,
        }),
        resolve({
            preferBuiltins: false,
        }),
        builtins(),
        commonjs({
            namesExports: {
                'node_modules/buffer/index.js': ['Buffer'],
            }
        }),
        json(),
    ],
    external: ['react', 'react-dom', 'prop-types', 'semantic-ui-react'],
};

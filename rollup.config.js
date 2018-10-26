import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

import { description, version } from './package.json';

export default {
    input: 'app/index.js',
    output: {
        dir: 'dist',
        file: 'bundle.js',
        format: 'cjs',
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
            plugins: ['@babel/external-helpers'],
        }),
        postcss({
            modules: true,
        }),
    ],
    external: ['react', 'react-dom', 'prop-types', 'semantic-ui-react'],
};

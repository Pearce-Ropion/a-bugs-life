module.exports = {
    setupFiles: ['./jest/rafShim.js', './jest/jestsetup.js'],
    collectCoverageFrom: [
        'app/**/*.js',
        'src/**/*.js',
        '!src/**/index.js',
        '!**/node_modules/**',
    ],
    coverageDirectory: './build_artifacts',
    coverageReporters: ['text', 'clover', 'cobertura', 'lcov'],
    resetModules: true,
    verbose: true,
    reporters: [
        'default',
        [
            'jest-junit',
            {
                'output': './build_artifacts/junit.xml',
            },
        ],
    ],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};

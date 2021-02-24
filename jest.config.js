module.exports = {
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test',
    },
    restoreMocks: true,
    coveragePathIgnorePatterns: ['node_modules', 'src/app.js', 'test'],
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
};

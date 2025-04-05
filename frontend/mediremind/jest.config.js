module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/'
    ],
    collectCoverage: false,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['html', 'text', 'text-summary'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/testing/'
    ],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report"
        }]
    ]
};
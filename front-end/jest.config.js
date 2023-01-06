module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  timers: 'fake',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        // set a default repository
        publicPath: './jest',
        // rename the reporter file to reporter.html
        filename: 'reporter.html',
        // expand all tests sections in the reporter.html file
        expand: 'true',
      },
    ],
  ],
  // if set to false, coverage tests won't be run
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/**/*.component.ts',
    '!src/main.ts',
    '!src/routes.ts',
    '!src/secondary/store/StoreVuex.ts',
    '!**/*.d.ts',
  ],
  coverageReporters: ['html', 'json-summary', 'text-summary', 'lcov', 'clover'],
  // set a default repository
  coverageDirectory: './jest',
};

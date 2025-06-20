// jest.config.cjs
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['module:@react-native/babel-preset'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-.*)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
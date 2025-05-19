module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
transformIgnorePatterns: [
  'node_modules/(?!(react-native|@react-native|react-native-vector-icons|@react-native-community|react-native-paper)/)',
],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
  '^react-native$': '<rootDir>/__mocks__/react-native.js',
},

};

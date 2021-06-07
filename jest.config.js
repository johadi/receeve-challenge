module.exports = {
  roots: ['<rootDir>/tests'],
  testRegex: '(.*\\.test\\.(tsx?|jsx?))$',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

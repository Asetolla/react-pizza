export default {
  extends: ['stylelint-config-standard-scss'],
  // ignoreFiles: ['**/*.stories.*', '**/stories/**'],
  rules: {
    'selector-class-pattern':
      '^[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
    'scss/no-global-function-names': null,
  },
}

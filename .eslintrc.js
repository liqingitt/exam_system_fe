module.exports = {
  // Umi 项目
  extends: require.resolve('umi/eslint'),
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }

}
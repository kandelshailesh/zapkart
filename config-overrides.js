// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addDecoratorsLegacy,
  useBabelRc
} = require('customize-cra')
const antdTheme = require('./src/theme')

module.exports = override(
  useBabelRc(),
  addDecoratorsLegacy(),
  useEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antdTheme
  })
)
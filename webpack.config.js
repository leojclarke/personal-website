const path = require('path')

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'main.js',
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/proposal-export-default-from',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-template-literals',
          ],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
}

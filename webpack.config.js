const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    alias: {
      '__components': path.resolve(__dirname, 'src/components'),
      '__constants': path.resolve(__dirname, 'src/constants'),
      '__contexts': path.resolve(__dirname, 'src/contexts'),
      '__mocks': path.resolve(__dirname, '__mocks__'),
      '__services': path.resolve(__dirname, 'src/services'),
      '__src': path.resolve(__dirname, 'src'),
    },
  },
};

const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const loadEnv = require('./loadEnv');

const envVars = loadEnv();

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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  plugins: [
    envVars['process.env.WITH_BUNDLE_ANALYZE'] === 'true' && new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin(envVars),
  ],
  resolve: {
    alias: {
      '__assets': path.resolve(__dirname, 'src/assets'),
      '__components': path.resolve(__dirname, 'src/components'),
      '__constants': path.resolve(__dirname, 'src/constants'),
      '__contexts': path.resolve(__dirname, 'src/contexts'),
      '__helpers': path.resolve(__dirname, 'src/helpers'),
      '__mocks': path.resolve(__dirname, '__mocks__'),
      '__services': path.resolve(__dirname, 'src/services'),
      '__src': path.resolve(__dirname, 'src'),
    },
  },
};

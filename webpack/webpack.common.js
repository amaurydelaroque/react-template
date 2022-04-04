const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv-flow').config({
  path: path.join(paths.root),
});

module.exports = {
  entry: [
    // SCSS
    path.resolve(__dirname, '..', './src/styles/index.scss'),
    // JS
    path.resolve(__dirname, '..', './src/index.tsx'),
  ],
  resolve: {
    alias: {
      app: path.resolve(__dirname, '..', './src'),
      src: path.resolve(__dirname, '..', './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset',
        generator: {
          filename: 'public/[hash][ext][query]',
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '..', './src/assets/favicon.ico'),
      template: path.resolve(__dirname, '..', './src/assets/index.html'),
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};

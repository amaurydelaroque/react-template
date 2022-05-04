const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv-flow').config({
  path: path.join(paths.root),
});

module.exports = {
  entry: [
    //SCSS
    paths.src + '/styles/index.scss',
    // JS
    paths.src + '/index.tsx',
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      app: paths.src,
      src: paths.src,
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
    path: paths.build,
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: paths.assets + '/favicon.ico',
      template: paths.assets + '/index.html',
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};

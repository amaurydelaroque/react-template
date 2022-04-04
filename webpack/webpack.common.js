const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    // SCSS
    path.resolve(__dirname, '..', './src/styles/index.scss'),
    // JS
    path.resolve(__dirname, '..', './src/index.tsx'),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '..', './src'),

      app: path.resolve(__dirname, '..', './src'),
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
    new CopyPlugin({
      patterns: [
        {
          from: 'source',
          to: 'dest',
          // Error if not set//TODO => why it's cause an error?
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};

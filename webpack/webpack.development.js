const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      //variable d'environnement //TODO => .env séparé
      'process.env.name': JSON.stringify('Oclock'),
    }),
    // Recharge uniquement ce qu'il y a besoin
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // Styles
      {
        test: /\.(s?css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              url: {
                filter: (url) => {
                  if (url.includes('charset=utf-8;;')) {
                    return false;
                  }
                  return true;
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
};

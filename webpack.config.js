const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },

  plugins: [
    new MiniCssExtractPlugin({
    filename: 'nouislider.css',
    }),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['./build/js/*js'],
      server: { baseDir: ['build'] }
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  }
};

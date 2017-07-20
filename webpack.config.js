import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { resolve } from 'path';
import webpack from 'webpack';

module.exports = {
  // base directory to resolve entry points regardless of OS
  context: resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
    './client',
  ],
  output: {
    filename: 'js/bundle.js', // filename: 'build.js'
    path: '/', // resolves path for both public and javascripts folder
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_compoents|public\/)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_compoents|public\/)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin(),
    // path to output css
    new ExtractTextPlugin('css/style.css'),
  ],
};

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main : __dirname + '../app/main.ts'
  },
  output: {
    filename : "./dist/[name].bundle.js"
  },

  devtool: "source-map",
  resolve: {
    extensions : ['.webpack.js', '.web.js', '.js', '.png', '.scss', '.css', '.eot', '.svg', '.ttf', '.woff', '.woff2'],
    alias : {
      styles:path.resolve(__dirname, '../app/styles'),
      assets:path.resolve(__dirname, '../app/assets')
    }
  },

  module : {
    rules : [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },

      {
        test: /\.js$/,
        loader: 'source-map-loader'
      },

      {
        test: /\.(scss|css)$/,
        exclude: ['node_modules','build'],
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use : [
            {
            loader : 'css-loader',
          },
          {
            loader : 'postcss-loader',
            options: {
              plugins:() => {
                autoprefixer({
                  browsers : ["last 4 version", "Firefox 15","ie 10", "ios 7"]
                })
              },

            }
          },

          {
            loader:'sass-loader',
            options: {
              outputStyle: 'expanded',
            }
          }
          ]
        })
      },


    ]
  }
}

// webpack.config.js

const webpack = require('webpack');

let config = {
  mode: "development",
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    globalObject: "this"
  },
  plugins: [],
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },
  watchOptions: {
    ignored: /node_modules/
  }
}

if (process.env.NODE_ENV !== 'production') {
  //
  // Development
  //
  config.plugins = config.plugins.concat([
    // new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ]);
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.AggressiveMergingPlugin()
  ]);
}

module.exports = config
// webpack.config.js

const webpack = require('webpack');

let config = {
  mode: "development",
  output: {
    filename: 'script.js',
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: 'babel-loader',
        }]
    }]
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
  config.entry = {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './app.js'
    ]
  };
  config.plugins = config.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]);

} 

module.exports = config
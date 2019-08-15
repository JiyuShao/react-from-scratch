let CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  mode: 'production',
  entry: './dilithium.js',
  output: {
    path: __dirname,
    filename: 'lib/dilithium.js',
    libraryTarget: 'umd',
    library: 'Dilithium',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new CircularDependencyPlugin()],
};

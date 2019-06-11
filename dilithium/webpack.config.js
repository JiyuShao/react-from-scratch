let CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
  mode: "production",
  entry: "./dilithium.js",
  output: {
    path: __dirname,
    filename: "build/Dilithium.js",
    libraryTarget: "umd",
    library: "Dilithium"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [new CircularDependencyPlugin()]
};

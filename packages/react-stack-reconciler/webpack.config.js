let CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
  mode: "production",
  entry: "./react.js",
  output: {
    path: __dirname,
    filename: "lib/react.js",
    libraryTarget: "umd",
    library: "React"
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

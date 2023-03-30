const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: "production",
   experiments: {
      asyncWebAssembly: true
   },
   entry: {
    inject: path.resolve(__dirname, "..", "src", "inject.ts"),
    content: path.resolve(__dirname, "..", "src", "content.ts"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: "manifest.json", to: "manifest.json", context: "src"}]
      }),
      new CopyPlugin({
         patterns: [{from: ".", to: "styles/", context: "src/styles"}]
      }),
   ],
};
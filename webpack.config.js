const path = require('path');

module.exports = {
  entry: './src/deep-link-to-native-app.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'deeplinkToNativeApp-from-typescript.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'deeplinkToNativeApp'
  }
};

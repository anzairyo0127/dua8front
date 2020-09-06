const path = require('path');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  entry: {
    main: './src/scripts/main.ts'
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.ts$/,
        use: [
          /* 
          {
            loader: 'babel-loader',
            options: {presets: ['@babel/preset-env']}
          },
          */
          { loader: "ts-loader" }
        ],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js'
  }
};
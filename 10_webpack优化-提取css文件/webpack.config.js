const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  // entry: "./src/index.js",
  entry: "./src/main.js",
  output: {
    // 打包之前清除之前打包文件资源
    clean: true,
    // 打包出口路径
    path: path.resolve(__dirname, "./build"),
    // 打包文件的名字
    filename: "js/[name]_bundle.js",
    // 单独针对分包的文件进行命名
    chunkFilename: "js/[name]_chunk.js",
    // 打包之后的资源放在CDN服务器上
    // publicPath: "http://coderwhycdn.com/",
  },
  // 排除某些包不需要进行打包
  // externals: {
  //   // key属性名：排除的框架的名称
  //   // value值：从CDN地址请求下来的js中提供对应的名称
  //   react: "React",
  //   axios: "axios",
  // },
  resolve: {
    // 打包文件类型
    extensions: [".js", ".json", ".wasm", ".jsx", ".ts"],
  },
  devServer: {
    static: ["public", "content"],
    host: "0.0.0.0",
    port: 3000,
    compress: true,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  // 优化配置
  optimization: {
    // 设置生成的chunkId的算法
    // developmemt: named
    // production: deterministic（确定性）
    // webpack4中使用：natural
    chunkIds: "deterministic",
    // runtime的代码是否抽取到单独的包中（早Vue2脚手架中）
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
      // 当一个包大于指定的大小时，继续进行拆包
      // maxSize: 20000,
      // 将包拆分成不小于minSize的包
      // minSize: 10000,
      minSize: 10,
      // 自己对需要进行拆包的内容进行分包
      cacheGroups: {
        vendors: {
          // /node_modules/
          // window 上面 /\
          // mac 上面 /
          test: /node_modules/,
          filename: "js/[id]_vendors.js",
        },
        utils: {
          test: /utils/,
          filename: "js/[id]_utils.js",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader", // 开发环境
          MiniCssExtractPlugin.loader, // 生产环境
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    // html文件打包插件
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ProvidePlugin({
      axios: ["axios", "default"],
      // get: ['axios', 'get'],
      dayjs: "dayjs",
    }),
    // 完成对css的提取
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name]_chunk.css",
    }),
  ],
};

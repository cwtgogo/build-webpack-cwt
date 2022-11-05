const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const autoprefixer = require("autoprefixer");
const projectRoot = process.cwd();  

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  // 匹配出目录
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  // 循环目录
  Object.keys(entryFiles).map((item, index) => {
    const file = entryFiles[index];
    const match = file.match(/src\/(.*)\/index.js/);
    const pathName = match && match[1];
    entry[pathName] = file;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `./src/${pathName}/index.html`), // 模版文件
      filename: `${pathName}.html`,
      inject: true,
      minify: true,
      // chunks: [], // 插入的js文件
    }));
    return item;
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const {
  entry,
  htmlWebpackPlugins,
} = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css/,
        use: [
          MiniCssExtractPlugin.loader, // 将css从js中拆离到css文件
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 5,
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除打包目录
    new FriendlyErrorsWebpackPlugin(), // 友好错误提示
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',

};

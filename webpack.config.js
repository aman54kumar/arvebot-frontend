const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [new MiniCssExtractPlugin()],
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js",
  },
};

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    hot: true,
  },
};
// const path = require("path");
// const webpack = require("webpack");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// module.exports = (env) => {
//   return {
//     plugins: [
//       require("autoprefixer"),
//       new MiniCssExtractPlugin({
//         filename: "[name].bundle.css",
//         chunkFilename: "[id].css",
//       }),
//       new webpack.HotModuleReplacementPlugin(),
//     ],
//     entry: path.resolve(__dirname, "src", "index.js"),
//     output: {
//       path: path.resolve(__dirname, "dist"),
//       filename: "bundle.js",
//     },
//     devServer: {
//       contentBase: path.resolve(__dirname, "dist"),
//       open: true,
//       clientLogLevel: "silent",
//       port: 9000,
//       historyApiFallback: true,
//       hot: true,
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(png|jpg)$/,
//           loader: "url-loader",
//         },
//         {
//           test: /\.(jsx|js)$/,
//           include: path.resolve(__dirname, "src"),
//           exclude: /node_modules/,
//           use: [
//             {
//               loader: "babel-loader",
//               options: {
//                 presets: [
//                   [
//                     "@babel/preset-env",
//                     {
//                       targets: "defaults",
//                     },
//                   ],
//                   "@babel/preset-react",
//                 ],
//               },
//             },
//           ],
//         },
//         {
//           test: /\.css$/i,
//           include: path.resolve(__dirname, "src"),
//           exclude: /node_modules/,
//           use: [
//             {
//               loader: MiniCssExtractPlugin.loader,
//               options: {
//                 hmr: env.NODE_ENV === "development",
//               },
//             },
//             {
//               loader: "css-loader",
//               options: {
//                 importLoaders: 1,
//               },
//             },
//             {
//               loader: `postcss-loader`,
//               options: {
//                 options: {},
//               },
//             },
//           ],
//         },
//       ],
//     },
//   };
// };

// const HtmlWebPackPlugin = require("html-webpack-plugin");
// var path = require("path");

// module.exports = {
//   context: __dirname,
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//     publicPath: "/",
//   },
//   module: {
//     // rules: [
//     //   {
//     //     test: /\.js$/,
//     //     loader: "esbuild-loader",
//     //     options: {
//     //       loader: "jsx", // Remove this if you're not using JSX
//     //       target: "es2015", // Syntax to compile to (see options below for possible values)
//     //     },
//     //   },
//     // ],
//     loaders: [
//       {
//         test: /\.js$/,
//         include: path.resolve(__dirname, "src"),
//         loader: "babel-loader",
//         query: {
//           presets: ["react", "es2015"],
//         },
//       },
//       {
//         test: /\.css$/,
//         loader: "style-loader!css-loader",
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: path.resolve(__dirname, "public/index.html"),
//       filename: "index.html",
//     }),
//   ],
//   devServer: { historyApiFallback: true },
// };

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
	entry: "./src/index.ts",
	devtool: 'inline-source-map',
	output: {
		path: path.join(__dirname, "dist"),
		publicPath: "/",
		filename: '[name].bundle.js',
	    chunkFilename: '[name].bundle.js',
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@styles": path.resolve(__dirname, "./src/assets/styles"),
			"@images": path.resolve(__dirname, "./src/assets/images"),
		},
	},
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
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-dynamic-import"],
					},
				},
			},
			{
				test: /\.(scss|sass|css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: true
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./dist/index.html",
		}),
		new Dotenv(),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
		watchContentBase: true,
		progress: true,
		historyApiFallback: true,
	},
};

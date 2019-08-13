module.exports = {
	module: {
		rules: [
			 { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
	externals: {
		react: {
			commonjs: "react",
			commonjs2: "react",
			amd: "React",
			root: "React"
		},
	}
};

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/react-authorization.js',
    output: {
        filename: 'react-authorization.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    }
};
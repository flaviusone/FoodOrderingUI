var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: [
      "./app.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader!less-loader') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader') },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('styles.css')
    ]

};

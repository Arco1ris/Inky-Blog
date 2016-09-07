var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        index: './src/client/index.js',
        admin: './src/client/manage/admin.js',
        login: './src/client/manage/login.js'
    },
    output: {
        path: __dirname + '/dist/',   
        publicPath: "/dist/",
        filename: '[name].js',
    },
    resolve:{
        extensions: ['', '.js'],
    },
    module: {
        loaders: [    
            {
                test: /\.js$/,     
                exclude: /node_modules/,
                loader: 'babel-loader',   
                query: {
                    presets: ['es2015', 'react', 'stage-2'],
                }
            },
            {    test: /\.(css|scss)$/,
                loaders: ['style', 'css-loader?-autoprefixer', 'sass', 'postcss'],
            },
        ]

    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
    
};
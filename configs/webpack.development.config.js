import webpack from 'webpack';
import Config from 'webpack-config';
const path = require('path');

export default new Config().extend('./configs/webpack.base.config.js').merge({
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        path.resolve(__dirname, '../client/index.js')
    ],
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
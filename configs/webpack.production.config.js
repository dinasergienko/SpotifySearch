import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('configs/webpack.base.config.js').merge({
    output: {
        filename: 'bundle.min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),]
});
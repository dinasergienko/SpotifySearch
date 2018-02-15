import express from 'express';
import path from 'path';
import request from 'request';
import url from 'url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { AUTH, PAGES } from './client/common/constants';

const PORT = 8080;
const PUBLIC_PATH = path.resolve(__dirname, './public');
const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';
const webpackDefaultConfig = require('./webpack.config.babel');
const webpackConfig = webpackDefaultConfig.default;
const compiler = webpack(webpackConfig);

if (isDevelopment) {
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        stats: {
            colors: true
        },
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static(PUBLIC_PATH));
}

app.get("/callback", function(req, res) {
    let code = req.query.code;
    let buffer = new Buffer([AUTH.CLIENT_ID, AUTH.CLIENT_SECRET].join(':'));
    let authorizationHeader = 'Basic ' + buffer.toString("base64");

    if (!code){
        console.log(req.query.error);
    } else {
        var data = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: AUTH.REDIRECT_URL
        };
        request({
            url: AUTH.SPOTIFY_TOKEN_URL,
            method: "POST",
            form: data,
            headers: {
                'Authorization': authorizationHeader
            }
        }, function(error, response, body){
            if (!error) {
                var results = JSON.parse(body);
                res.redirect(url.format({
                    pathname: PAGES.LOGIN_ROUTE,
                    query: {
                        accessToken: results.access_token,
                        refreshToken: results.refresh_token
                    }
                }));
                return;
            }

            console.log(error);
        });
    }
});

app.all("*", function(req, res) {
    if (isDevelopment) {
        const filename = path.join(PUBLIC_PATH, "index.html");
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    } else {
        res.sendFile(path.resolve(PUBLIC_PATH, "index.html"));
    }
});


app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
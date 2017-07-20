import './dotenv';

/* eslint-disable import/first */

import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import expressSession from 'express-session';
import User from '../client/model/user';

// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackDevMiddleware from 'webpack-dev-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

import './db';
import routing from './routing';
import { WEB_PORT, STATIC_PATH, isProd } from '../client/config';
import { secret } from './config';

// import socketIO from 'socket.io';
// import setUpSocket from './socket';

const app = express();
// flow-disable-next-line
// const http = Server(app);
// setUpSocket(socketIO(http));

app.use(favicon('public/img/favicon.ico'));
app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressSession({ // expressSession middleware
  secret, // used to create a hash to sign session requests; must be kept securely
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

// Webpack Server
// creates a webpack based on config
const webpackCompiler = webpack(webpackConfig);
// adds webpack as middleware
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    hot: true,
    colors: true,
    chunks: true,
    'errors-only': true,
  },
}));
app.use(webpackHotMiddleware(webpackCompiler, {
  // eslint-disable-next-line no-console
  log: console.log,
}));

routing(app);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const server = app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://${server.address().address}:${server.address().port}.
  ${isProd ? '(production)' : '(development).\nKeep "yarn dev:wds" running in an other terminal'}`);
});

exports.WEB_PORT = process.env.PORT || 8000; // looks at .env file
exports.WDS_PORT = 7000;

exports.STATIC_PATH = '/static';

exports.APP_NAME = 'Hello Stasks';

const APP_CONTAINER_CLASS = 'js-app';
exports.APP_CONTAINER_CLASS = APP_CONTAINER_CLASS;
exports.APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`;
const JSS_SSR_CLASS = 'jss-ssr';
exports.JSS_SSR_CLASS = JSS_SSR_CLASS;
exports.JSS_SSR_SELECTOR = `.${JSS_SSR_CLASS}`;

exports.IO_CONNECT = 'connect';
exports.IO_DISCONNECT = 'disconnect';
exports.IO_CLIENT_HELLO = 'IO_CLIENT_HELLO';
exports.IO_CLIENT_JOIN_ROOM = 'IO_CLIENT_JOIN_ROOM';
exports.IO_SERVER_HELLO = 'IO_SERVER_HELLO';

exports.isProd = process.env.NODE_ENV === 'production';

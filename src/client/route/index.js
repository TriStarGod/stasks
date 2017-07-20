// @flow

export const HOME = '/';
export const HELLO = '/hello';
export const HELLO_ASYNC = '/hello-async';
export const NOT_FOUND = '/404';

export const helloEndpointRoute = num => `/ajax/hello/${num || ':num'}`;

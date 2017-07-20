import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import Tether from 'tether';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux/reducer/configureStore';
import { APP_CONTAINER_SELECTOR, JSS_SSR_SELECTOR, isProd } from './config';
import App from './app';
// import setUpSocket from './socket';

window.jQuery = $;
window.Tether = Tether;
require('bootstrap');

const store = configureStore();
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

let wrapApp = (AppComponent, reduxStore) => {
  render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <AppContainer>
          <AppComponent />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    rootEl,
  );
};
if (!isProd) {
  if (module && module.hot) {
    const wrapAppCopy = wrapApp;
    const wrapAppError = (error) => {
      // eslint-disable-next-line global-require, import/no-extraneous-dependencies
      const RedBox = require('redbox-react').default;
      render(<RedBox error={error} />, rootEl);
    };
    wrapApp = (AppComponent, reduxStore) => {
      try {
        wrapAppCopy(AppComponent, reduxStore);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        wrapAppError(error);
      }
    };
    module.hot.accept('./redux/reducer/rootReducer', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./redux/reducer/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
    // flow-disable-next-line
    module.hot.accept('./app', () => {
      // eslint-disable-next-line global-require
      const NextApp = require('./app').default;
      wrapApp(NextApp, store);
    });
  }
}

wrapApp(App, store);

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR);
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide);

// setUpSocket(store);

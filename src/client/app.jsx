// @flow

import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import HelloPage from './component/page/HelloPage';
import HelloAsyncPage from './component/page/HelloAsyncPage';
import HomePage from './component/page/HomePage';
import Footer from './component/footer';
import Nav from './component/nav';
import NotFoundPage from './component/page/NotFoundPage';
import { APP_NAME } from './config';
import { HOME, HELLO, HELLO_ASYNC } from './route';

/* <Route exact path={HOME} render={() => <HomePage />} />
<Route path={HELLO} render={() => <HelloPage />} />
<Route path={HELLO_ASYNC} render={() => <HelloAsyncPage />} />
<Route component={NotFoundPage} /> */

// the exact keyword in route is used to limit to only / and nothing more like /a
const App = () =>
  <div style={{ paddingTop: 54 }}>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <Switch>
      <Route exact path={HOME} component={HomePage} />
      <Route path={HELLO} component={HelloPage} />
      <Route path={HELLO_ASYNC} component={HelloAsyncPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>;

export default App;

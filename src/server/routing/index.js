// @flow

import users from './users';
import main from './main';

export default (app) => {
  users(app);
  main(app);
};

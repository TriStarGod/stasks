import user from '../../client/model/user';
// mongo uses the plural of the object (adds s);
// for most cases it works out except for like fish (ie. fishs)
export default (app) => {
  app.get('/user/list', (req, res) => {
    user.find((err, users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(users);
    });
  });
};

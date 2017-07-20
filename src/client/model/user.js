import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
});
User.plugin(passportLocalMongoose);
export default mongoose.model('User', User);

// For testing
// db.users.insert({ "username": "administrator",
// "password": "changethisasap",
// "firstName": "D", "lastName": "A" });

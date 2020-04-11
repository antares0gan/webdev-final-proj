const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

// schema defines what data looks like in database
// via mongoose, it can take a schema and translate to model
const UserSchema = new Schema({
  username: { type: String, index: { unique: true} },
  password: String,
  tickets: [{
    depature: String,
    arrival: String,
    date: String,
    depTime: String,
    arrTime: String
  }]
}, { collection : 'users' });

// Save is a MongoDB API, that is called by 'create'
UserSchema.pre("save", function(next) {
  // this logic below allows us to protect the password
  // in the case of a user update, but
  // where the password
  if(!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = UserSchema;
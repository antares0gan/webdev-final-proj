const Schema = require('mongoose').Schema;
const bcrypt = require('bcryptjs');

// schema defines what data looks like in database
// via mongoose, it can take a schema and translate to model
const UserSchema = new Schema({
  username: { type: String, index: { unique: true } },
  password: String,
  tickets: [{
    depCode: String,    // airport code
    arrCode: String,    // airport code
    depTime: String,    // xx:yy
    arrTime: String,    // xx:yy
    depAirport: String,  // airport name
    arrAirport: String,    // airport name
    flightNumber: String,  // GH0000
    aircraft: String,   // TBD or B744
    date: String,       // yyyy-mm-dd
    price: String       // $ xxx
  }]
}, { collection : 'users' });

// Save is a MongoDB API, that is called by 'create'
UserSchema.pre("save", function(next) {
  // this is used by create, after create it encrypts password and pass
  // to next stage
  if(!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function(plaintext, callback) {
  // this is used by auth, it takes raw password, doing encryption and compare
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = UserSchema;
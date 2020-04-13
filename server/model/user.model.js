const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UserSchema = require('./user.schema');

// mongoose takes schema to generate model
// it's just like model by using java class and object
const UserModel = mongoose.model("User", UserSchema);

// via mongoose, create a new object based on model class
// then mongoose will handle logic of adding that newly generated object
// to database. no need to write database logic anymore
function addUser(user) {
  return UserModel.create(user);
}

// similar to add, mongoose takes username and do findone in mongo db
function getUserByUserName(username) {
  return UserModel.findOne({username: username}).exec();
}

function updateUser(username, update) {
  return UserModel.update({username: username}, update).exec();
}

// select all
function getAllUsers() {
  return UserModel.find().exec();
}

// Make sure to export a function after you create it!
module.exports = {
  addUser,
  getUserByUserName,
  getAllUsers,
  updateUser,
};
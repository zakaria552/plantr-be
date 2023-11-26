const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: { type: String, required: true},
  email: {type: String, required: true},
  passwordHash: {type: String, required: true},
  plants: Array
});

const UsersModel = mongoose.model("user", usersSchema);
module.exports = UsersModel;
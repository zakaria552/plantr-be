const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true},
  plants: Array
});

const UsersModel = mongoose.model("user", usersSchema);
module.exports = UsersModel;
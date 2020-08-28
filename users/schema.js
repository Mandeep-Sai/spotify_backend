const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  googleId: String,
});

const userModel = model("user", userSchema);

module.exports = userModel;

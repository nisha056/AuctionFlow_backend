const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

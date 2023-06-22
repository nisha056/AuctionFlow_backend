const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
// });
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

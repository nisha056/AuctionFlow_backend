const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bidSchema = new mongoose.Schema({
  bidamount: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
  },
  product_id: {
    type: String,
  },
  confirm: {
    type: Number,
    required: true,
  },
  bid: {
    type: [String],
  },
});
const bidModel = mongoose.model("bidModel", bidSchema);
module.exports = bidModel;

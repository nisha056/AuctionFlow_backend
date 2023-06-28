const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const productSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  username: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  like: {
    //It consists of the array of users who have liekd the product
    type: [String],
  },
  starting_amount: {
    type: Number,
    required: true,
  },
  latest_bid: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const productModel = mongoose.model("productModel", productSchema);
module.exports = productModel;

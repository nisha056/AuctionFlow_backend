const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
});
module.exports = mongoose.model("Product", productSchema);

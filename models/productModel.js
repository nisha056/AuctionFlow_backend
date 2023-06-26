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
    date: {
        type: String,
        required: true,
    },
    like: {
        type: [String],
    },
    image: {
        type: String,
        required: true,
    },
});
const productModel = mongoose.model("productModel", productSchema);
module.exports = productModel;
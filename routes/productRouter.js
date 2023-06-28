const express = require("express");
const productRouter = express.Router();
const {
    viewproduct,
    likeproduct,
    addproduct,
    delproduct,
    likedproductlist,
    bidForProduct,
    getproductById,
} = require("../controllers/productController");

productRouter.route("/").get(viewproduct);
productRouter.route("/:id").get(getproductById);
productRouter.route("/").post(addproduct);
productRouter.route("/like/:likeid").post(likeproduct);
productRouter.route("/:id").delete(delproduct);
productRouter.route("/likes/:user_id").get(likedproductlist);
productRouter.route("/:product_id/bid").put(bidForProduct);
module.exports = productRouter;
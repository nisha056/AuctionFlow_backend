const express = require("express");
const productRouter = express.Router();
const {
  viewproduct,
  likeproduct,
  addproduct,
  delproduct,
} = require("../controllers/productController");

productRouter.route("/").get(viewproduct);
productRouter.route("/").post(addproduct);
productRouter.route("/:likeid").patch(likeproduct);
productRouter.route("/:id").delete(delproduct);

module.exports = productRouter;

const express = require("express");
const bidRouter = express.Router();
const {
  getbid,
  addbid,
  bidproductlist,
  makeBid,
} = require("../controllers/bidController");

bidRouter.route("/").post(addbid);
bidRouter.route("/").get(getbid);
bidRouter.route("/:bidid").post(makeBid);
bidRouter.route("/:user_id").get(bidproductlist);
// bidRouter.route("/bid/:bidid").get(bidproduct);
module.exports = bidRouter;

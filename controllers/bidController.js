const bidModel = require("../models/bidModel");
const express = require("express");
const jwt = require("jsonwebtoken");
module.exports.getbid = async function getbid(req, res) {
  try {
    const bid = await bidModel.find();
    res.json(bid);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.addbid = async function addbid(req, res) {
  try {
    const { bidamount, confirm, product_id } = req.body;
    let bid = await bidModel.create({ bidamount, confirm });
    if (bid) {
      return res.status(200).json({
        success: true,
        message: "added bid",
        data: bid,
        isError: false,
        devError: "",
        error: "",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "",
        data: {},
        isError: true,
        devError: "Error on adding",
        error: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.makeBid = async function makeBid(req, res) {
  try {
    console.log(req);
    const bidid = req.params.id;
    const userId = req.params.user_id;
    const bidAmount = await bidModel.findById(bidid);
    if (bidAmount) {
      if (bidAmount.bid.includes(userId)) {
        bidAmount.bid.pull(userId);
      } else {
        bidAmount.like.push(userId);
      }
      const savedProduct = await bidAmount.save();
      if (savedProduct) {
        res.status(200).json({
          success: true,
          message: "Accessed bid product",
          data: savedProduct,
          isError: false,
          devError: "",
          error: "",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "",
          data: {},
          isError: true,
          devError: "Error in accessing bidd product",
          error: "Something went wrong",
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: "",
        data: {},
        isError: true,
        devError: "Product not found with this id",
        error: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "",
      data: {},
      isError: true,
      devError: "Error on retrieving",
      error: "Something went wrong",
    });
  }
};
module.exports.bidproductlist = async function bidproductlist(req, res) {
  try {
    const userId = req.params.user_id;
    const bidProduct = await bidModel.find({
      bid: { $in: [userId] },
    });
    res.status(200).json({
      success: true,
      message: "Bidded product accessed",
      data: bidProduct,
      isError: false,
      devError: "",
      error: "",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Product is not liked",
      data: {},
      isError: true,
      devError: "Liked products cannot be retrieved",
      error: "Something is wrong",
    });
  }
};

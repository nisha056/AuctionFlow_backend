const productModel = require("../models/productModel");
const express = require("express");
const jwt = require("jsonwebtoken");

module.exports.viewproduct = async function viewproduct(req, res) {
  try {
    const product = await productModel.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.getproductById = async function getproductById(req, res) {
  const id = req.params.id;
  try {
    const product = await productModel.findById(id);
    const updatedProduct = await product.save();
    res.status(200).json({
      message: "Product is found",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports.likeproduct = async function likeproduct(req, res) {
  try {
    likeid = req.params.likeid;
    userId = req.body.user_id;
    const existProduct = await productModel.findById(likeid);
    if (existProduct) {
      if (existProduct.like.includes(userId)) {
        existProduct.like.pull(userId);
      } else {
        existProduct.like.push(userId);
      }
      const savedProduct = await existProduct.save();
      if (savedProduct) {
        res.status(200).json({
          success: true,
          message: "Liked product",
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
          devError: "Error in saving liked product",
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
      message: err.message,
    });
  }
};
module.exports.likedproductlist = async function likedproductlist(req, res) {
  try {
    //what items are being liked by specific users so here we will
    //give the id of the user
    const userId = req.params.user_id;
    const likedProduct = await productModel.find({
      like: { $in: [userId] },
    });
    res.status(200).json({
      success: true,
      message: "Liked product accessed",
      data: likedProduct,
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
module.exports.addproduct = async function addproduct(req, res) {
  try {
    let data = req.body;
    let product = await productModel.create(data);
    if (product) {
      return res.status(200).json({
        message: "Product added successfully",
        product,
      });
    } else {
      res.status(400).json({
        message: "Error on adding",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.delproduct = async function delproduct(req, res) {
  try {
    let id = req.params.id;
    let item = await productModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "selected Product is deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.bidForProduct = async function bidForProduct(req, res) {
  try {
    const product_id = req.params.product_id;
    let value = req.body;
    let product = await productModel.findById(product_id);
    if (product.enddate < Date.now()) {
      return res.status(500).json({
        message: "Bidding has ended for this product.",
        product,
      });
    }
    if (product.latest_bid <= product.starting_amount) {
      return res.status(500).json({
        message: "Latest bid must be greater than the starting bid",
        product,
      });
    }
    if (value.latest_bid <= product.latest_bid) {
      return res.status(500).json({
        message: "Latest bid must be greater than the current bid",
        product,
      });
    }

    product.username = value.username;
    product.latest_bid = value.latest_bid;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "New bid has been made",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

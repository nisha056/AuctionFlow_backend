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
// module.exports.getbyid = async function getbyid(req, res) {
//   try {
//     getid = req.params.getid;
//     const product = await productModel.findById(getid);
//     res.json(product);
//     res.status(200).json({
//       message: "Got a product",
//       product,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };

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
    //giev the id of the user
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

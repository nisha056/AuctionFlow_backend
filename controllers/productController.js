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

module.exports.likeproduct = async function likeproduct(req, res) {
  try {
    likeid = req.params.likeid;
    await productModel.findByIdAndUpdate(likeid, { like: true }, { new: true });
    res.status(200).json({
      message: "Liked a product",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
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

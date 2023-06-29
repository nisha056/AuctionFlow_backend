const userModel = require("../models/userModel");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var SECRET = "mynewproject";
module.exports.viewuser = async function viewuser(req, res) {
  try {
    const user = await userModel.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.signup = async function signup(req, res) {
  try {
    let value = req.body;
    // hashed the password for security purpose
    // value.password = await bcrypt.hash(req.body.password, 10);
    let user = await userModel.create(value);
    if (user) {
      return res.status(200).json({
        message: "Signed up successfully",
        data: user,
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
module.exports.login = async function login(req, res) {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (user) {
      if (req.body.password === user.password) {
        const token = jwt.sign({ username: user.username }, SECRET, {
          expiresIn: "10d",
        });
        return res.status(200).json({
          message: "User logged in succesfully",
          data: {
            jwt: token,
            username: user.username,
            _id: user._id,
          },
        });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//used it as a middleware
module.exports.verifytoken = async function (req, res, next) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        jwt.verify(token, SECRET, (err, decode) => {
          if (err) {
            res.send({ err });
            return;
          }
          if (decode) {
            req.user = decode;
            res.status(200).json({ message: "token verified sucessfullly!" });
          }
        });
      } else {
        res.status(400).json({
          message: "malformed auth header",
        });
      }
    } else {
      res.status(400).json({
        message: "No authorization header",
      });
    }
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
};

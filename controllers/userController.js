const userModel = require("../models/userModel");
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET = "secret" } = process.env;
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
    // check if the user exists
    const user = await userModel.findOne({ username: req.body.username });
    if (user) {
      //check if password matches
      // const result = await bcrypt.compare(req.body.password, user.password);
      if (req.body.password === user.password) {
        const token = await jwt.sign({ username: user.username }, SECRET, {
          expiresIn: "10d",
        });
        res.cookie("jwt", token, {
          httpOnly: true,
        });
        return res.status(200).json({
          message: "User logged in succesfully",
          jwt: token,
          username: user.username,
        });
        // const token =
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRpbGxpIiwiaWF0IjoxNjg3NDMzMDcyLCJleHAiOjE2ODc2MDU4NzJ9._FygqECKf5Xo2XuyUMZaFoDxR2Dq5gElMrbWXW4C-wM";
      }

      // sign token and send it in response
      else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
// module.exports.verifytoken = async function verifytoken(req, res) {
// try {
//   let token = req.cookies;
//   if (token) {
//     let auth = jwt.verify(token.jwt, process.env.SECRET);
//     if (auth) {
//       const user = await userModel.findById(auth.payload);
//       res.status(200).json({
//         username: user.username,
//       });
//     } else {
//       res.status(400).json({
//         message: "Token invalid",
//       });
//     }
//   } else {
//     res.status(400).json({
//       message: "No token found",
//     });
//   }
// } catch (err) {
//   return res.status(500).json({
//     message: "Failed to authorize",
//   });
// }
// };

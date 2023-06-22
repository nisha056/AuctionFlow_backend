const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");

const app = express();
// Connect to MongoDB Atlas
const mongoURI =
  "mongodb+srv://Nishasharma:12345@cluster0.sjmwscv.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(8000);
    console.log(`Server is running`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.use(bodyParser.json());

app.use("/products", productRouter);

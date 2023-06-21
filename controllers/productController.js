const Product = require("../models/product");
class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  }
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const product = await Product.findById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }

  async createProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Internal Server error" });
    }
  }
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdates(id, req.body, {
        new: true,
      });
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: "User mot found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Internal Server error" });
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByidAndDelete(id);
      if (deletedProduct) {
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Internal Server error" });
    }
  }
}
module.exports = new ProductController();

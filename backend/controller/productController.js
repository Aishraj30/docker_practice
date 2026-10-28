
const mongoose = require("mongoose");
const Product = require("../models/product");

// GET: All products
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// POST: Add product
async function addProduct(req, res) {

    console.log("POST /api/products received:", req.body);
  try {
    const { name, price, stock } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return res.status(400).json({
        error: "Please provide valid name, price and stock",
      });
    }

    const product = await Product.create({ name, price, stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed   ,. .,to add product" });
  }
}

// DELETE: Product by ID
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = { getProducts, addProduct, deleteProduct };

const express = require("express");

const router = express.Router();

const productController = require("../Controllers/ProductController");

// CREATE product
router.post("/", productController.createProduct);

// GET all products
router.get("/", productController.getAllProducts);

// GET one product
router.get("/:id", productController.getProduct);

// UPDATE product
router.put("/:id", productController.updateProduct);

// DELETE product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
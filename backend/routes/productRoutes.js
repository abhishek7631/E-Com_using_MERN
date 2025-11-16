const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
} = require("../controllers/productController");

const formidable = require("express-formidable");

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products

router.get("/get-product", getProductController);

module.exports = router;

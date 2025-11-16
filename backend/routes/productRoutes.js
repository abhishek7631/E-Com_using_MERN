const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProduct,
  productPhotoController,
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

//single product

router.get("/get-product/:slug", getSingleProduct);

//get photo

router.get("/product-photo/:pid", productPhotoController);

module.exports = router;

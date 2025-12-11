const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProduct,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
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

//update product

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products

router.get("/get-product", getProductController);

//single product

router.get("/get-product/:slug", getSingleProduct);

//get photo

router.get("/product-photo/:pid", productPhotoController);

//delete product

router.delete("/delete-product/:pid", deleteProductController);

//filter route

router.post("/product-filters", productFilterController);

module.exports = router;

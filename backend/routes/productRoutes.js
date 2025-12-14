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
  productCountController,
  productListController,
  productSearchController,
  relatedProductController,
  productCategoryController,
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

//product count

router.get("/product-count", productCountController);

//product per page

router.get("/product-list/:page", productListController);

//search product

router.get("/product-search/:keyword", productSearchController);

//similar product

router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product

router.get("/product-category/:slug", productCategoryController);

module.exports = router;

const express = require("express");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category

router.get("/get-category", categoryController);

//single category

router.get("/single-category/:slug", singleCategoryController);

module.exports = router;

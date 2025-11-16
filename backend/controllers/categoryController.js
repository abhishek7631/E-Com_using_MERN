const categoryModel = require("../models/categoryModel");

const slugify = require("slugify");

exports.createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(501).send({ message: "Name is required" });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res
        .status(200)
        .send({ success: true, message: "Category Already Exisits" });
    }

    const category = await categoryModel.create({ name, slug: slugify(name) });

    res
      .status(201)
      .send({ success: true, message: "New category created", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//upadte category

exports.updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

//get all category

exports.categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res
      .status(200)
      .send({ success: true, message: "All Categories List", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

//single category

exports.singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

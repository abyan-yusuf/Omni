const Category = require("../models/Category.js");
const SubCategory = require("../models/SubCategory.js");
const fs = require("fs");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.fields;
    const { image } = req.files;
    if (!name) {
      return res.status(404).send({ message: "Please enter a name" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(500).send({ message: "Category already exists" });
    }
    const newCategory = new Category({ ...req.fields });
    if (image) {
      newCategory.image.data = fs.readFileSync(image.path);
      newCategory.image.contentType = image.type;
    }
    await newCategory.save();
    return res
      .status(200)
      .send({ message: "Category created successfully", newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}).select("-image");
    res.status(200).json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { catid } = req.params;
    const singleCategory = await Category.findById(catid).select("-image");
    if (!singleCategory) {
      return res.status(500).send({ message: "Category not found" });
    }
    res.status(200).json(singleCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { catid } = req.params;
    const { name } = req.fields;
    const { image } = req.files;
    if (!name) {
      return res.status(404).send({ message: "Please enter a name" });
    }
    const existingCategory = await Category.findOne({ name });
    const updatedCategory = await Category.findByIdAndUpdate(
      catid,
      { name: name ? name : existingCategory.name },
      { new: true }
    );
    if (image) {
      updatedCategory.image.data = image
        ? fs.readFileSync(image.path)
        : existingCategory.image.data;
      updatedCategory.image.contentType = image
        ? image.type
        : existingCategory.image.contentType;
    }
    await updatedCategory.save();
    return res
      .status(200)
      .send({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { catid } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(catid);
    await SubCategory.deleteMany({ parentCat: catid });
    res
      .status(200)
      .send({ message: "Category deleted", category: deleteCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getImageById = async (req, res) => {
  try {
    const { catid } = req.params;
    const singleCategory = await Category.findById(catid).select("image");
    if (!singleCategory) {
      return res.status(500).send({ message: "Category not found" });
    }
    res.set("Content-Type", singleCategory.image.contentType);
    res.send(singleCategory.image.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

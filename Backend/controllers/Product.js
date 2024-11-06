import Product from "../models/Product.js";
import ProductColor from "../models/ProductColor.js";
import ProductImage from "../models/ProductImage.js";
import fs from "fs";
import ProductSize from "../models/ProductSize.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      originalPrice,
      discountPrice,
      category,
      subCategory,
    } = req.body;
    if (!name) return res.status(404).send({ message: "Name is required" });
    if (!code) return res.status(404).send({ message: "Code is required" });
    if (!description)
      return res.status(404).send({ message: "Description is required" });
    if (!originalPrice)
      return res.status(404).send({ message: "Original Price is required" });
    if (!discountPrice)
      return res.status(404).send({ message: "Discount Price is required" });
    if (!category)
      return res.status(404).send({ message: "Category is required" });
    if (!subCategory)
      return res.status(404).send({ message: "Sub Category is required" });
    const existingProduct = await Product.findOne({ name });
    if (existingProduct)
      return res.status(500).send({ message: "Product already exists" });
    const newProduct = new Product({
      name,
      code,
      description,
      originalPrice,
      discountPrice,
      category,
      subCategory,
    });
    await newProduct.save();
    return res
      .status(200)
      .send({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      description,
      originalPrice,
      discountPrice,
      category,
      subCategory,
      featured,
      bestSeller,
    } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct)
      return res.status(404).send({ message: "Product not found" });


    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name || existingProduct.name,
        code: code || existingProduct.code,
        description: description || existingProduct.description,
        originalPrice: originalPrice || existingProduct.originalPrice,
        discountPrice: discountPrice || existingProduct.discountPrice,
        category: category || existingProduct.category,
        subCategory: subCategory || existingProduct.subCategory,
        featured: featured || existingProduct.featured,
        bestSeller: bestSeller || existingProduct.bestSeller,
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createPColor = async (req, res) => {
  try {
    const { product, color } = req.body;
    if (!product)
      return res.status(404).send({ message: "Product Id is required" });
    if (!color) return res.status(404).send({ message: "Color is required" });
    const existingProductColor = await ProductColor.findOne({ product, color });
    if (existingProductColor)
      return res.status(500).send({ message: "Product Color already exists" });
    const newProductColor = new ProductColor({
      product,
      color,
      default: req.body.default || false,
    });
    await newProductColor.save();
    return res
      .status(200)
      .send({ message: "Product Color created successfully", newProductColor });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deletePColor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductColor = await ProductColor.findByIdAndDelete(id);
    const deletedProductSize = await ProductSize.findByIdAndDelete({ color: id });
    const deletedProductImage = await ProductImage.deleteMany({ product_color: id });
    if (!deletedProductColor)
      return res.status(404).send({ message: "Product Color not found" });
    return res
      .status(200)
      .send({ message: "Product Color deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createPImage = async (req, res) => {
  try {
    const { product_color } = req.fields;
    const { image } = req.files;
    if (!product_color)
      return res.status(404).send({ message: "Product Color Id is required" });
    const newProductImage = new ProductImage({
      product_color,
      default: req.fields.default || false,
    });
    if (image) {
      newProductImage.image.data = fs.readFileSync(image.path);
      newProductImage.image.contentType = image.type;
    } else return res.status(404).send({ message: "Image is required" });
    await newProductImage.save();
    return res
      .status(200)
      .send({ message: "Product Image created successfully", newProductImage });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deletePImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductImage = await ProductImage.findByIdAndDelete(id);
    if (!deletedProductImage)
      return res.status(404).send({ message: "Product Image not found" });
    return res
      .status(200)
      .send({ message: "Product Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createPSize = async (req, res) => {
  try {
    const { color, sizes } = req.body;
    if (!color)
      return res.status(500).send({ message: "Product Color Id is required" });
    if (!sizes)
      return res.status(500).send({ message: "Product Size Id is required" });
    const existingProductSize = await ProductSize.findOne({ color, sizes });
    if (existingProductSize)
      return res.status(500).send({ message: "Product Size already exists" });
    const newProductSize = new ProductSize({ color, sizes });
    await newProductSize.save();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const updatePSize = async (req, res) => {
  try {
    const { id } = req.params;
    const { sizes } = req.body;
    if (!sizes)
      return res.status(500).send({ message: "Product Size Id is required" });
    const updatedProductSize = await ProductSize.findByIdAndUpdate(
      id,
      { sizes },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Product Size updated successfully", updatedProductSize });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const db = mongoose.connection;
    const allProducts = await db.collection("ProductView").find().toArray();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).send({ message: "Product not found" });
    return res
      .status(200)
      .send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
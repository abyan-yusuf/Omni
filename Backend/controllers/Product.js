import Product from "../models/Product.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      originalPrice,
      discountPrice,
      color,
      sizes,
      category,
      subCategory,
    } = req.fields;

    const { image1, image2 } = req.files;
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
    if (!image1)
      return res.status(404).send({ message: "Image 1 is required" });
    if (!image2)
      return res.status(404).send({ message: "Image 2 is required" });
    if (!color) return res.status(404).send({ message: "Color is required" });
    if (!sizes) return res.status(404).send({ message: "Sizes is required" });
    const existingProductByCode = await Product.findOne({ code });
    const existingProductByName = await Product.findOne({ name });
    if (existingProductByCode || existingProductByName)
      return res
        .status(500)
        .send({ message: "Product already exists by code or name" });

    const sizesArray = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    const newProduct = new Product({
      ...req.fields,
      sizes: sizesArray,
    });

    newProduct.image1.data = fs.readFileSync(image1.path);
    newProduct.image1.contentType = image1.type;
    newProduct.image2.data = fs.readFileSync(image2.path);
    newProduct.image2.contentType = image2.type;

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
      color,
      sizes,
      category,
      subCategory,
    } = req.fields;

    const { image1, image2 } = req.files;

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
    if (!color) return res.status(404).send({ message: "Color is required" });
    if (!sizes) return res.status(404).send({ message: "Sizes is required" });

    const existingProduct = await Product.findById(id);
    if (!existingProduct)
      return res.status(500).send({ message: "Product does not exist" });

    const sizesArray = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    const data = {
      ...req.fields,
      sizes: sizesArray,
    };
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (image1?.path && image1?.type) {
      updatedProduct.image1.data = fs.readFileSync(image1.path);
      updatedProduct.image1.contentType = image1.type;
    }

    if (image2?.path && image2?.type) {
      updatedProduct.image2.data = fs.readFileSync(image2.path);
      updatedProduct.image2.contentType = image2.type;
    }

    await updatedProduct.save();

    if (!updatedProduct)
      return res.status(404).send({ message: "Product not found" });
    return res
      .status(200)
      .send({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .select("name discountPrice originalPrice color sizes _id")
      .populate("color sizes");
    return res.status(200).json(products);
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
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const productImage = await Product.findById(id).select(`image1`);
    if (!productImage)
      return res.status(404).send({ message: "Product Image not found" });
    if (productImage.image1.data) {
      res.set("Content-Type", productImage.image1.contentType);
      return res.status(200).send(productImage.image1.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductDetailsImage = async (req, res) => {
  try {
    const { id } = req.params;
    const productImage = await Product.findById(id).select(`image2`);
    if (!productImage)
      return res.status(404).send({ message: "Product Image not found" });
    if (productImage.image2.data) {
      res.set("Content-Type", productImage.image2.contentType);
      return res.status(200).send(productImage.image2.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getLatestPorductsByCat = async (req, res) => {
  try {
    const { catid } = req.params;
    const products = await Product.find({ category: catid })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("-image1 -image2");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true })
      .select("name discountPrice originalPrice color sizes _id")
      .populate("color sizes");
    res.status(200).json(
      featuredProducts.map((p) => ({
        _id: p._id,
        name: p.name,
        discountPrice: p.discountPrice,
        originalPrice: p.originalPrice,
        color: p.color.name,
        sizes: p.sizes.map((s) => s.size),
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getBestSellerProducts = async (req, res) => {
  try {
    const bestSellerProducts = await Product.find({ bestSeller: true })
      .select("name discountPrice originalPrice color sizes _id")
      .populate("color sizes");
    res.status(200).json(
      bestSellerProducts.map((p) => ({
        _id: p._id,
        name: p.name,
        discountPrice: p.discountPrice,
        originalPrice: p.originalPrice,
        color: p.color.name,
        sizes: p.sizes.map((s) => s.size),
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { catid } = req.params;
    const products = await Product.find({ category: catid })
      .select("name discountPrice originalPrice color sizes _id")
      .populate("color sizes");
    res.status(200).json(
      products.map((p) => ({
        _id: p._id,
        name: p.name,
        discountPrice: p.discountPrice,
        originalPrice: p.originalPrice,
        color: p.color.name,
        sizes: p.sizes.map((s) => s.size),
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getProductsBySubCategory = async (req, res) => {
  try {
    const { subcatid } = req.params;
    const products = await Product.find({ subCategory: subcatid })
      .select("name discountPrice originalPrice color sizes _id")
      .populate("color sizes");
    res.status(200).json(
      products.map((p) => ({
        _id: p._id,
        name: p.name,
        discountPrice: p.discountPrice,
        originalPrice: p.originalPrice,
        color: p.color.name,
        sizes: p.sizes.map((s) => s.size),
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: "Product not found" });
    const products = await Product.find({ subCategory: product.subCategory })
      .select("name discountPrice originalPrice color sizes _id")
      .populate("color sizes");
    res.status(200).json(
      products
        .filter((p) => p._id.toString() !== id)
        .map((p) => ({
          _id: p._id,
          name: p.name,
          discountPrice: p.discountPrice,
          originalPrice: p.originalPrice,
          color: p.color.name,
          sizes: p.sizes.map((s) => s.size),
        }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
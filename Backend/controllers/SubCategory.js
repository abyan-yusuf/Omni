import Product from "../models/Product.js"
import SubCategory from "../models/SubCategory.js"
import fs from "fs"

export const getAllSubCategories = async (req, res) => { 
    try {
        const subCategories = await SubCategory.find({})
          .select("-image")
          .populate("parentCat");

        const subCategoriesWithCounts = await Promise.all(
          subCategories.map(async (subCategory) => {
            const productCount = await Product.countDocuments({
              subCategory: subCategory._id,
            });
            return {
              ...subCategory.toObject(),
              productCount,
            };
          })
        );
        res.status(200).json(subCategoriesWithCounts)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export const createSubCategory = async (req, res) => { 
    try {
        const { name, parentCat } = req.fields;
        const { image } = req.files;
        if (!name) {
            return res.status(404).send({ message: "Name is required" })
        }
        if (!parentCat) {
            return res.status(404).send({ message: "Parent Category is required" })
        }
        const existingSubCategory = await SubCategory.findOne({ name, parentCat })
        if (existingSubCategory) {
            return res.status(500).send({ message: "SubCategory already exists" })
        }
        const newSubCategory = new SubCategory({ name, parentCat })
        if (image) {
            newSubCategory.image.data = fs.readFileSync(image.path)
            newSubCategory.image.contentType = image.type
        }
        await newSubCategory.save()
        return res
            .status(200)
            .send({ message: "SubCategory created successfully", newSubCategory })
    } catch (error) {
        console.error(error)
    }
}

export const updateSubCategory = async (req, res) => {
    try {
        const { subid } = req.params
        const { name, parentCat } = req.fields
        const { image } = req.files
        if (!name) {
            return res.status(404).send({ message: "Please enter a name" })
        }
        if (!parentCat) {
            return res.status(404).send({ message: "Please enter a parent category" })
        }
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            subid,
            { ...req.fields },
            { new: true }
        )
        if (image) {
            updatedSubCategory.image.data = fs.readFileSync(image.path)
            updatedSubCategory.image.contentType = image.type
        }
        await updatedSubCategory.save()
        return res
            .status(200)
            .send({ message: "SubCategory updated successfully", updatedSubCategory })
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export const deleteSubCategory = async (req, res) => {
    try {
        const { subid } = req.params;
        const deleteSubCategory = await SubCategory.findByIdAndDelete(subid)
        res.status(200).send({message: "SubCategory deleted", subCategory: deleteSubCategory})
    } catch (error) {
        console.error(error)
    }
}

export const getSubCategoryById = async (req, res) => {
    try {
        const { subid } = req.params
        const singleSubCategory = await SubCategory.findById(subid).select("-image").populate("parentCat")
        res.status(200).json(singleSubCategory)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export const getImageById = async (req, res) => {
    try {
        const { subid } = req.params;
        const productImage = await SubCategory.findById(subid).select("image")
        if (!productImage) {
            return res.status(500).send({ message: "SubCategory not found" })
        }
        if (productImage.image.data) {
            res.set("Content-Type", productImage.image.contentType)
            return res.status(200).send(productImage.image.data)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

export const getSubCategoriesByParentCat = async (req, res) => {
    try {
        const { parentCat } = req.params
        const subCategories = await SubCategory.find({ parentCat })
          .select("-image")
          .populate("parentCat");

        const subCategoriesWithCounts = await Promise.all(
          subCategories.map(async (subCategory) => {
            const productCount = await Product.countDocuments({
              subCategory: subCategory._id,
            });
            return {
              ...subCategory.toObject(),
              productCount,
            };
          })
        );
        res.status(200).json(subCategoriesWithCounts)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}

import mongoose from "mongoose";

export const createProductView = async () => {
  try {
    const db = mongoose.connection.db;
    const existingViews = await db
      .listCollections({ name: "ProductView" })
      .toArray();

    if (existingViews.length > 0) {
      return;
    } else
      await db.createCollection("ProductView", {
        viewOn: "products",
        pipeline: [
          {
            $lookup: {
              from: "product_colors",
              localField: "_id",
              foreignField: "product",
              as: "colors",
              pipeline: [
                {
                  $match: {
                    default: true,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$colors",
          },
          {
            $lookup: {
              from: "product_images",
              localField: "colors._id",
              foreignField: "product_color",
              as: "image",
              pipeline: [
                {
                  $match: {
                    default: true,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$image",
          },
          {
            $lookup: {
              from: "product_sizes",
              localField: "colors._id",
              foreignField: "color",
              as: "sizes",
            },
          },
          {
            $lookup: {
              from: "colors",
              localField: "colors.color",
              foreignField: "_id",
              as: "color",
            },
          },
          {
            $unwind: "$color",
          },
          {
            $lookup: {
              from: "sizes",
              localField: "sizes.sizes",
              foreignField: "_id",
              as: "actualSize",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            }
          },
          {
            $unwind: "$category",
          },
          {
            $lookup: {
              from: "sub-categories",
              localField: "subCategory",
              foreignField: "_id",
              as: "subCategory",
            }
          },
          {
            $unwind: "$subCategory",
          },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              code: { $first: "$code" },
              description: { $first: "$description" },
              originalPrice: { $first: "$originalPrice" },
              discountPrice: { $first: "$discountPrice" },
              category: { $first: "$category.name" },
              subCategory: { $first: "$subCategory.name" },
              color: { $first: "$color.name" },
              sizes: { $first: "$actualSize.size" },
              image: { $first: "$image._id" },
            },
          },
        ],
      });
  } catch (error) {
    console.error(error);
  }
};
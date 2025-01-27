import React, { useEffect, useState } from "react";
import useCategories from "../Hooks/useCategories";
import axios from "axios";

const SubCategoryForm = ({
  handleSubmit,
  value,
  setValue,
  image,
  id,
  parent,
  setParent,
  setImage,
  cancelButton,
  handleCancel,
  className,
}) => {
  const [subCategory, setSubCategory] = useState({});
  const [url, setUrl] = useState("");
  const getCategory = async () => {
    if (id) {
      const { data } = await axios.get(
        `https://omni-1-men7.onrender.com/api/v1/categories/single/${id}`
      );
      console.log(data);
      setSubCategory(data);
    }
  };
  const categories = useCategories();
  useEffect(() => {
    getCategory();
  }, [id]);

  const getImageUrl = () => {
    if (image) {
      return setUrl(URL.createObjectURL(image));
    } else {
      if (id)
        return setUrl(
          `https://omni-1-men7.onrender.com/api/v1/sub-categories/image/${id}`
        );
    }
  };
  useEffect(() => {
    getImageUrl();
  }, [image]);

  return (
    <form
      className={"form-control space-y-2 " + className}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Sub Category Name"
        className="input w-96 input-bordered"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        required
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      <img src={url} className="h-auto w-52" />
      <select
        className="select select-bordered w-full max-w-xs"
        required
        onChange={(e) => {
          setParent(e.target.value);
        }}
        value={parent}
      >
        <option disabled selected={!subCategory} value={""}>
          Select Root Category
        </option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
            selected={subCategory?.parentCat?._id == category._id}
          >
            {category.name}
          </option>
        ))}
      </select>
      <div className="space-x-2">
        <button type="submit" className="btn btn-primary w-20">
          Submit
        </button>
        {cancelButton ? (
          <button
            type="button"
            className="btn btn-primary w-20"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default SubCategoryForm;

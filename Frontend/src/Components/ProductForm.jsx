import useCategories from "../Hooks/useCategories";
import useColors from "../Hooks/useColors";
import useSubCategories from "../Hooks/useSubCategories";
import useSizes from "../Hooks/useSizes";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductForm = ({
  name,
  setName,
  code,
  setCode,
  description,
  setDescription,
  originalPrice,
  setOriginalPrice,
  discountPrice,
  setDiscountPrice,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  handleSubmit,
  handleCancel,
  handleDelete,
  color,
  setColor,
  image1,
  setImage1,
  sizes,
  setSizes,
  image2,
  setImage2,
  featured,
  setFeatured,
  bestSeller,
  setBestSeller,
  id,
  cancelButton,
}) => {
  let categories = useCategories();
  const subCategories = useSubCategories();
  const colors = useColors();
  const allSizes = useSizes();
  const [url, setUrl] = useState("");
  const [detailsUrl, setDetailsUrl] = useState("");

  const getImageUrl = () => {
    return image1
      ? setUrl(URL.createObjectURL(image1))
      : id
      ? setUrl(`https://backend.omnishoesbd.com/api/v1/products/image/${id}`)
      : setUrl("");
  };
  useEffect(() => {
    getImageUrl();
  }, [image1]);

  const getDetailsUrl = () => {
    return image2
      ? setDetailsUrl(URL.createObjectURL(image2))
      : id
      ? setDetailsUrl(
          `https://backend.omnishoesbd.com/api/v1/products/image/details/${id}`
        )
      : setDetailsUrl("");
  };

  useEffect(() => {
    getDetailsUrl();
  }, [image2]);

  if (subCategory && !category) {
    const getCategory = async () => {
      const { data } = await axios.get(
        `https://backend.omnishoesbd.com/api/v1/sub-categories/single/${subCategory}`
      );
      setCategory(data.parentCat._id);
    };
    getCategory();
  }

  return (
    <form
      className="flex flex-col space-y-5 items-baseline justify-center form-control"
      onReset={handleCancel}
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between w-full">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          className="input input-bordered"
          placeholder="Product Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <textarea
        className="textarea textarea-bordered textarea-lg w-full"
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className="flex justify-between w-full">
        <input
          type="number"
          className="input input-bordered"
          placeholder="Product Original Price"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(Number(e.target.value))}
          required
        />
        <input
          type="number"
          className="input input-bordered"
          placeholder="Product Discount Price"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(Number(e.target.value))}
          required
        />
      </div>
      <div className="flex space-x-5 w-full">
        <select
          type="text"
          className="select select-bordered basis-1/2"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Select Product Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          type="text"
          className="select select-bordered basis-1/2"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
        >
          <option value="" disabled selected>
            Select Product Sub Category
          </option>
          {subCategories
            .filter((subCategory) =>
              category ? subCategory.parentCat._id === category : true
            )
            .map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex space-x-5 w-full">
        <select
          type="text"
          className="select select-bordered basis-1/2"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="" disabled selected>
            Select Product Color
          </option>
          {colors.map((color) => (
            <option key={color._id} value={color._id}>
              {color.name}
            </option>
          ))}
        </select>
        <div className="basis-1/2">
          <select
            type="text"
            className="select select-bordered block mb-2 w-full"
            value={""}
            onChange={(e) => {
              setSizes([...sizes, JSON.parse(e.target.value)]);
            }}
          >
            <option value="" disabled selected>
              Select Product Size
            </option>
            {allSizes
              .filter(
                (size) =>
                  !sizes.some((selectedSize) => selectedSize._id === size._id)
              )
              .map((size) => (
                <option
                  key={size._id}
                  value={JSON.stringify({ size: size.size, _id: size._id })}
                >
                  {size.size}
                </option>
              ))}
          </select>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size, index) => (
              <div key={size._id} className="badge badge-accent">
                {size.size}
                <button
                  className="ms-1"
                  type="button"
                  onClick={() => {
                    setSizes(sizes.filter((_, i) => i !== index));
                  }}
                >
                  <img src="/close.svg" alt="Remove" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="label">
          <div className="label-text">Pick Image 1</div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage1(e.target.files[0])}
          className="file-input file-input-bordered mb-2"
          required={!id}
        />
        {id || image1 ? <img src={url} alt={name} /> : <></>}
      </div>
      <div>
        <div className="label">
          <div className="label-text">Pick Image 2</div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage2(e.target.files[0])}
          className="file-input file-input-bordered mb-2"
          required={!id}
        />
        {id || image2 ? <img src={detailsUrl} alt={name} /> : <></>}
      </div>
      <div>
        <label className="label cursor-pointer space-x-2">
          <span className="label-text">Featured: </span>
          <input
            type="checkbox"
            className="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label className="label cursor-pointer space-x-2">
          <span className="label-text">Bestseller: </span>
          <input
            type="checkbox"
            className="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
          />
        </label>
      </div>
      <div className="flex space-x-2">
        <input
          type="submit"
          disabled={
            !id
              ? !name ||
                !code ||
                !description ||
                !originalPrice ||
                !discountPrice ||
                !category ||
                !subCategory ||
                !color ||
                !image1 ||
                !image2 ||
                sizes.length === 0
              : false
          }
          className="btn"
        />
        {cancelButton ? (
          <button type="reset" className="btn">
            Cancel
          </button>
        ) : (
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;

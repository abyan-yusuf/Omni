import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { Prices } from "../prices";
import Loader from "../Components/Loader";

const CategoriesProducts = () => {
  const { cid } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState(null);
  console.log(category);
  console.log(subCategories);
  console.log(products);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://omni-1-men7.onrender.com/api/v1/products/category/${cid}`
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSubCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://omni-1-men7.onrender.com/api/v1/sub-categories/all/${cid}`
      );
      setSubCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://omni-1-men7.onrender.com/api/v1/categories/single/${cid}`
      );
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
    getSubCategories();
    getCategory();
  }, [cid]);

  const color = [...new Set(products.flatMap((product) => product.color))];
  const sizes = [...new Set(products.flatMap((product) => product.sizes))].sort(
    (a, b) => a - b
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  console.log()
  return (
    <>
      {products.length && category && subCategories.length ? (
        <Layout>
          <div className="">
            <div className="breadcrumbs text-sm mt-5 ml-5">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <p>{category?.name}</p>
                </li>
              </ul>
            </div>
          </div>
          <section className="flex space-x-5 mr-10 ml-5">
            <div className="basis-2/12 mb-10 overflow-y-auto max-h-[calc(100vh-5rem)!important] scrollbar-hidden">
              {selectedColor || selectedSize || selectedPrice ? (
                <>
                  <h2 className="text-lg font-normal mb-3 font-[Forum] tracking-wider">
                    REFINE BY
                  </h2>
                  <div className="grid grid-cols-2 gap-y-3">
                    {selectedColor && (
                      <div className="badge bg-gray-200 rounded-sm py-3 gap-2">
                        <button onClick={() => setSelectedColor(null)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-4 w-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                        {selectedColor}
                      </div>
                    )}
                    {selectedSize && (
                      <div className="badge bg-gray-200 rounded-sm py-3 gap-2">
                        <button onClick={() => setSelectedSize(null)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-4 w-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                        {selectedSize}
                      </div>
                    )}
                    {selectedPrice && (
                      <div className="badge col-span-2 bg-gray-200 rounded-sm py-3 gap-2">
                        <button onClick={() => setSelectedPrice(null)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-4 w-4 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                        {
                          Prices.filter((p) => p.array === selectedPrice)[0]
                            .name
                        }
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="collapse collapse-arrow">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-normal  font-[Forum]">
                  <span className="w-4 h-4 mr-3 collapse-icon"></span>
                  COLOR
                </div>
                <div className="collapse-content grid grid-cols-5 gap-3">
                  {color.map((color) => (
                    <div
                      onClick={() => setSelectedColor(color)}
                      className="w-8 h-8 border-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-normal  font-[Forum]">
                  <span className="w-4 h-4 mr-3 collapse-icon"></span>
                  SIZE
                </div>
                <div className="collapse-content">
                  {sizes.map((size) => (
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-x-3">
                        <input
                          onClick={() => setSelectedSize(size)}
                          value={size}
                          name="size"
                          type="radio"
                          className="radio h-4 rounded-md w-4"
                        />
                        <span className="label-text">{size}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="collapse collapse-arrow flex-row-reverse">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title text-lg font-normal  font-[Forum]">
                  <span className="w-4 h-4 mr-3 collapse-icon"></span>
                  PRICE
                </div>
                <div className="collapse-content">
                  {Prices.map((price) => (
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-3">
                        <input
                          type="radio"
                          className="radio h-4 rounded-md w-4"
                          name="price"
                          onClick={() => setSelectedPrice(price.array)}
                        />
                        <span className="label-text">{price.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="basis-10/12">
              <h1 className="text-3xl font-[Forum] font-medium mt-5">
                {category?.name?.slice(0, -2)}
              </h1>
              <h5 className="text-lg font-[Forum]">Sub Categories</h5>
              <div className="grid grid-cols-5 gap-6 mt-5 mb-14">
                {subCategories.map((subCategory) => (
                  <Link
                    key={subCategory._id}
                    to={`/sub-category/${subCategory._id}`}
                    className="flex space-x-3 items-center"
                  >
                    <img
                      src={`https://omni-1-men7.onrender.com/api/v1/sub-categories/image/${subCategory._id}`}
                      className="h-16 w-16 rounded-full"
                    />
                    <div>
                      <p className=" font-normal">{subCategory.name}</p>
                      <p className="font-normal text-[#272727]">
                        {subCategory.productCount} Items
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-10">
                {products
                  .filter((product) => {
                    const matchesColor = selectedColor
                      ? product.color.includes(selectedColor)
                      : true;
                    const matchesSize = selectedSize
                      ? product.sizes.includes(selectedSize)
                      : true;
                    const matchesPrice = selectedPrice
                      ? product.discountPrice >= selectedPrice[0] &&
                        product.discountPrice <= selectedPrice[1]
                      : true;

                    return matchesColor && matchesSize && matchesPrice;
                  })
                  .map((product) => (
                    <ProductCard
                      key={product._id}
                      name={product.name}
                      price={product.originalPrice}
                      discount={product.discountPrice}
                      id={product._id}
                      admin={false}
                      color={product.color}
                      sizes={product.sizes}
                    />
                  ))}
              </div>
            </div>
          </section>
        </Layout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CategoriesProducts;

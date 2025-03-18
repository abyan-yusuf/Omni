import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import { Prices } from "../prices";
import ProductCard from "../Components/ProductCard";

const SubCategoryProducts = () => {
  const { sid } = useParams();
  const [subCategory, setSubCategory] = useState({});
  const [products, setProducts] = useState([]);
  console.log(products, subCategory);
  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://backend.omnishoesbd.com/api/v1/sub-categories/single/${sid}`
      );
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://backend.omnishoesbd.com/api/v1/products/sub-category/${sid}`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategory();
    getProducts();
  }, [sid]);

  const color = [...new Set(products.flatMap((product) => product.color))];
  const sizes = [...new Set(products.flatMap((product) => product.sizes))].sort(
    (a, b) => a - b
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  console.log([selectedColor, selectedSize, selectedPrice]);
  return (
    <>
      {products.length && subCategory ? (
        <Layout>
          <div className="breadcrumbs text-sm mt-5 ml-5">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={`/category/${subCategory?.parentCat?._id}`}>
                  {subCategory?.parentCat?.name}
                </Link>
              </li>
              <li>
                <p>{subCategory?.name}</p>
              </li>
            </ul>
          </div>
          <section className="flex space-x-5 mr-10 ml-5">
            <div className="basis-2/12 mb-10 overflow-y-auto max-h-[calc(100vh-5rem)!important] scrollbar-hidden">
              <div className="">
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
            </div>
            <div className="basis-10/12">
              <h1 className="text-3xl font-[Forum] mb-10 font-medium mt-5">
                {subCategory?.name}
              </h1>
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
export default SubCategoryProducts;

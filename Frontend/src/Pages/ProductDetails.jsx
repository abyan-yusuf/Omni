import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import ProductImageZoom from "../Components/ProductImageZoom";
import Loader from "../Components/Loader";
import { useCartContext } from "../Apis/cartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling
    });
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://backend.omnishoesbd.com/api/v1/products/single/${id}`
      );
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const [selectedSize, setSelectedSize] = useState(null);
  console.log(selectedSize);

  const [quantity, setQuantity] = useState(1);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const getRelatedProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://backend.omnishoesbd.com/api/v1/products/similar/${product._id}`
      );
      setRelatedProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (product?._id) getRelatedProducts();
  }, [product?._id]);

  const [cartData, setCartData] = useCartContext();
  return (
    <>
      {!product?._id ? (
        <Loader />
      ) : (
        <Layout>
          <div className="breadcrumbs text-sm mt-5 ml-5">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={`/category/${product?.category?._id}`}>
                  {product?.category?.name}
                </Link>
              </li>
              <li>
                <Link
                  to={`category/${product?.category?._id}/subCategory/${product?.subCategory?._id}`}
                >
                  {product?.subCategory?.name}
                </Link>
              </li>
              <li>{product?.name}</li>
            </ul>
          </div>
          <section className="flex mt-7 mx-5 space-x-5">
            <div className="basis-1/2">
              {" "}
              <ProductImageZoom
                imageSrc={`https://backend.omnishoesbd.com/api/v1/products/image/details/${product?._id}`}
              />
            </div>
            <div className="basis-1/2">
              <h4 className="font-[Roboto] text-xl font-medium">
                {product?.name}
              </h4>
              <h5 className="font-[Roboto] font-light mt-2 text-xl text-gray-500">
                Product Code: {product?.code}
              </h5>
              <div className="flex space-x-2 mt-10 text-2xl">
                <h5
                  className={
                    "font-[Roboto] font-normal" +
                    (product?.discountPrice !== product?.originalPrice
                      ? " line-through text-gray-400"
                      : "")
                  }
                >
                  Tk.{product?.originalPrice}
                </h5>

                {product?.discountPrice !== product?.originalPrice && (
                  <h5 className="font-[Roboto] font-normal text-[#272727]">
                    Tk.{product?.discountPrice} {product?.discount}
                  </h5>
                )}
              </div>
              <p className="font-[Roboto] mt-10 text-gray-600 text-xl font-light mr-10">
                {product?.description?.substring(0, 200) + "..."}
              </p>
              <div className="mt-10">
                <h4 className="font-[Roboto] font-normal text-2xl">Color</h4>
                <div className="tooltip" data-tip={product?.color?.name}>
                  <div
                    className="h-12 mt-2 rounded-full w-12 border-4"
                    style={{ backgroundColor: product?.color?.name }}
                  />
                </div>
              </div>
              <div className="mt-10">
                <h4 className="font-[Roboto] font-normal text-2xl">Sizes</h4>
                <div className="flex space-x-3 mt-3">
                  {product?.sizes?.map((size) => (
                    <button
                      className={`py-2 px-3 rounded-full border-2 font-normal ${
                        selectedSize === size._id
                          ? "bg-[#232323] text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedSize(size._id)}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <h4 className="font-[Roboto] font-normal text-2xl">Quantity</h4>
                <div className="flex mt-3 items-center space-x-2">
                  <button
                    className="py-[5px] px-4 text-2xl rounded-full border-2"
                    disabled={quantity === 1}
                    onClick={() =>
                      setQuantity((prevQuantity) => prevQuantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="text-2xl">{quantity}</span>
                  <button
                    className="py-1 px-3 text-2xl rounded-full border-2"
                    onClick={() =>
                      setQuantity((prevQuantity) => prevQuantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-10 mr-48">
                <button
                  className="btn w-full px-0 rounded-none mt-5 text-lg font-normal  hover:bg-[black!important]  bg-transparent border-2 shadow-none hover:text-white  text-black transition-all duration-500"
                  onClick={() => {
                    if (selectedSize === null)
                      return toast.error("Please select a size");
                    else {
                      setCartData([
                        ...cartData,
                        { product, quantity, size: selectedSize },
                      ]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([
                          ...cartData,
                          { product, quantity, size: selectedSize },
                        ])
                      );
                      toast.success("Successfully added to cart");
                    }
                  }}
                >
                  ADD TO CART
                </button>
                <button className="btn w-full px-0 rounded-none mt-5 text-transparent text-lg font-normal  hover:bg-[black!important]  bg-[#D80032!important] border-none shadow-none text-white transition-all duration-500 mb-5">
                  BUY IT NOW
                </button>
              </div>
            </div>
          </section>
          <section className="mt-10 mx-5">
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab text-xl rounded-s-[0px!important] font-normal"
                aria-label="Description"
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-none p-6 text-xl font-light"
              >
                {product?.description}
                <br />
                <br />
                Disclaimer <br /> There may be a slight color variation in the
                image from the original product.
              </div>
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab text-xl font-normal rounded-s-[0px!important] whitespace-nowrap"
                aria-label="Size Chart"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-none p-6"
              >
                Tab content 2
              </div>
            </div>
          </section>
          <section className="mt-10 mb-20 mx-5">
            <h4 className="font-[Forum] font-normal text-center text-3xl">
              You many also like
            </h4>
            <div className="grid grid-cols-4 gap-5 mt-10">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  price={product.originalPrice}
                  discount={product.discountPrice}
                  id={product._id}
                  color={product.color}
                  sizes={product.sizes}
                />
              ))}
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default ProductDetails;

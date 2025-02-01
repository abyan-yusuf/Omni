import Layout from "../Layout/Layout";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useCategories from "../Hooks/useCategories";
import { Link } from "react-router-dom";
import useSubCategories from "../Hooks/useSubCategories";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductCard";
const Home = () => {
  const [slides, setSlides] = useState([]);
  const getAllSlides = async () => {
    try {
      const { data } = await axios.get(
        "https://omni-1-men7.onrender.com/api/v1/slides/all-slides"
      );
      setSlides(data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllSlides();
  }, []);
  const categories = useCategories();
  const subCategories = useSubCategories();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [latestProducts, setLatestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  const getLatestProducts = async (c) => {
    try {
      const { data } = await axios.get(
        `https://omni-1-men7.onrender.com/api/v1/products/latest/${c}`
      );
      setLatestProducts(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://omni-1-men7.onrender.com/api/v1/products/featured"
      );
      setFeaturedProducts(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getBestSellerProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://omni-1-men7.onrender.com/api/v1/products/bestseller"
      );
      setBestSellerProducts(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      getLatestProducts(categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  useEffect(() => {
    getBestSellerProducts();
  }, []);

  console.log(featuredProducts)
  return (
    <>
      {slides.length === 0 &&
      categories.length === 0 &&
      subCategories.length === 0 &&
      latestProducts.length < 1 ? (
        <Loader />
      ) : (
        latestProducts.length > 0 && (
          <Layout>
            {/* Slides */}
            <section>
              <Swiper
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="swipper"
                loop={true}
                slidesPerView={1}
                autoplay={true}
              >
                {slides.map((slide) => (
                  <SwiperSlide
                    key={slide._id}
                    className="w-[screen] h-[38.5vw]"
                  >
                    <img
                      src={`https://omni-1-men7.onrender.com/api/v1/slides/image/${slide._id}`}
                      alt="slide"
                      className="w-full h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
            {/* Categories */}
            <section className="mx-12  my-7 grid grid-cols-4 gap-5">
              {categories.map((category) => (
                <Link
                  to={`/category/${category._id}`}
                  key={category._id}
                  className="flex flex-col items-center relative justify-center group overflow-hidden h-40"
                >
                  {/* Image */}
                  <img
                    src={`https://omni-1-men7.onrender.com/api/v1/categories/image/${category._id}`}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay (Gray effect) */}
                  <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                </Link>
              ))}
            </section>
            {/* Sub Categories */}
            <section className="mx-12 my-10 grid grid-cols-5 gap-5">
              {subCategories.map((subCategory) => (
                <Link
                  to={`/sub-category/${subCategory._id}`}
                  key={subCategory._id}
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
            </section>
            {/* New Arrivals */}
            <section className="mx-8 my-20">
              <h1 className="text-3xl font-normal font-[Roboto] -z-10">
                New Arrivals
              </h1>
              <ul className="flex justify-center items-center space-x-14 -z-10 mb-10">
                {categories.map((category, i) => (
                  <li key={category._id}>
                    <button
                      className={`font-['forum'] text-lg tracking-wider font-[600] px-4 border-2 ${
                        selectedCategory === category?._id
                          ? "rounded-full"
                          : i === 0 && !selectedCategory
                          ? "rounded-full"
                          : "border-transparent"
                      }`}
                      onClick={() => {
                        setSelectedCategory(category._id);
                        getLatestProducts(category._id);
                      }}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
              {latestProducts.length !== 0 ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="latest-swipper pl-14"
                  slidesPerView={4}
                  slidesPerGroup={4}
                >
                  {latestProducts.map((p) => (
                    <SwiperSlide>
                      <ProductCard
                        key={p?._id}
                        admin={false}
                        id={p?._id}
                        name={p?.name}
                        price={p?.originalPrice}
                        color={p?.color}
                        sizes={p?.sizes}
                        discount={p?.discountPrice}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <></>
              )}
            </section>
            {/* Featured Products */}
            <section className="mx-8 my-20">
              <h1 className="text-3xl font-normal font-[Roboto] mb-10">
                Featured For You
              </h1>
              {featuredProducts.length !== 0 ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="latest-swipper pl-14"
                  slidesPerView={4}
                  slidesPerGroup={4}
                >
                  {featuredProducts.map((p) => (
                    <SwiperSlide>
                      <ProductCard
                        key={p?._id}
                        admin={false}
                        id={p?._id}
                        name={p?.name}
                        price={p?.originalPrice}
                        color={p?.color}
                        sizes={p?.sizes}
                        discount={p?.discountPrice}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <></>
              )}
            </section>
            {/* BestSeller Products */}
            <section className="mx-8 my-20">
              <h1 className="text-3xl font-normal font-[Roboto] mb-10">
                Best Seller
              </h1>
              {bestSellerProducts.length !== 0 ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="latest-swipper pl-14"
                  slidesPerView={4}
                  slidesPerGroup={4}
                >
                  {bestSellerProducts.map((p) => (
                    <SwiperSlide>
                      <ProductCard
                        key={p?._id}
                        admin={false}
                        id={p?._id}
                        name={p?.name}
                        price={p?.originalPrice}
                        color={p?.color}
                        sizes={p?.sizes}
                        discount={p?.discountPrice}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <></>
              )}
            </section>
          </Layout>
        )
      )}
    </>
  );
};

export default Home;

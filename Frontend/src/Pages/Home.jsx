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
const Home = () => {
  const [slides, setSlides] = useState([]);
  const getAllSlides = async () => {
    try {
      const { data } = await axios.get(
        "https://omni-yxd5.onrender.com/api/v1/slides/all-slides"
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
  console.log(selectedCategory)
  return (
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
            <SwiperSlide key={slide._id} className="w-[screen] h-[38.5vw]">
              <img
                src={`https://omni-yxd5.onrender.com/api/v1/slides/image/${slide._id}`}
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
            key={category._id}
            className="flex flex-col items-center relative justify-center group overflow-hidden h-40"
          >
            {/* Image */}
            <img
              src={`https://omni-yxd5.onrender.com/api/v1/categories/image/${category._id}`}
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
          <Link key={subCategory._id} className="flex space-x-3 items-center">
            <img
              src={`https://omni-yxd5.onrender.com/api/v1/sub-categories/image/${subCategory._id}`}
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
      <section className="mx-12 my-20">
        <h1 className="text-3xl font-normal font-[Roboto]">New Arrivals</h1>
        <ul className="flex justify-center items-center space-x-14">
          {categories.map((category) => (
            <li>
              <button
                key={category._id}
                className={`font-['forum'] text-lg tracking-wider font-[600] px-4 ${
                  selectedCategory === category._id? "border-2 rounded-full":"border-2 border-transparent"}`}
                onClick={() => setSelectedCategory(category._id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

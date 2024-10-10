import Layout from "../Layout/Layout";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Home = () => {
  const [slides, setSlides] = useState([]);
  const getAllSlides = async () => {
    try {
      const {data} = await axios.get(
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
  return (
    <Layout>
      <section>
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="h-96 swipper"
          loop={true}
          slidesPerView={1}
          autoplay={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide._id}>
              <img
                src={`https://omni-yxd5.onrender.com/api/v1/slides/image/${slide._id}`}
                alt="slide"
                className="w-full object-cover h-96"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Layout>
  );
};

export default Home;

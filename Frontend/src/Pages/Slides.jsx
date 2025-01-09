import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";

const Slides = () => {
  const [slides, setSlides] = useState([]);
  const addSlide = async (image) => {
    try {
      const data = new FormData();
      data.append("image", image);
      const response = await axios.post(
        "https://omni-yxd5.onrender.com/api/v1/slides/create",
        data
      );
      toast.success(response.data.message);
      getAllSlides();
      setImage("");
    } catch (error) {
      toast.error(error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://omni-yxd5.onrender.com/api/v1/slides/delete/${id}`
      );
      toast.success(data.message);
      getAllSlides();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllSlides();
  }, []);
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/5">
          <AdminMenu />
        </div>
        <div className="basis-4/5 px-5">
          <h1 className="text-4xl text-center font-semibold mb-10 mt-5">
            All Slides
          </h1>
          <div className="grid grid-cols-2 gap-8">
            {slides.map((slide) => (
              <div className="relative group">
                <button
                  className="w-full h-full hidden bg-[rgba(0,0,0,0.5)] z-10 cursor-pointer group-hover:block absolute"
                  onClick={() => handleDelete(slide._id)}
                >
                  <img
                    src="/delete.svg"
                    className="w-10 h-10 mr-auto ml-auto"
                  />
                </button>
                <img
                  src={`https://omni-yxd5.onrender.com/api/v1/slides/image/${slide._id}`}
                  className="w-full h-56 group-hover:bg-[rgba(0,0,0,0.5)]"
                />
              </div>
            ))}
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs mt-10"
            accept="image/*"
            onChange={(e) => {
              addSlide(e.target.files[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Slides;

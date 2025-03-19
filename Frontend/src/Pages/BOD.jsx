import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import DirectorCard from "../Components/DirectorCard";
import { Link } from "react-router-dom";

const BOD = () => {
  const [allDirectors, setAllDirectors] = useState([]);

  const getAllDirectors = async () => {
    try {
      const { data } = await axios.get(
        "https://backend.omnishoesbd.com/api/v1/directors/all"
      );
      setAllDirectors(data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllDirectors();
  }, []);
  return (
    <Layout classname={"mx-36"}>
    <div className="">
      <div className="breadcrumbs text-sm mt-5">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <p>Board Of Directors</p>
          </li>
        </ul>
      </div>
    </div>
      <h2 className="text-4xl text-white text-center w-[calc(100vw-18rem)] bg-[#8D4949] font-light mt-16 py-3">
        Our Board Of Directors
      </h2>
      <div className="grid grid-cols-3 mb-20 gap-x-5 gap-y-20 mt-10   ">
        {allDirectors.map((d) => (
          <DirectorCard
            {...d}
            /*{...d} = ( _id={d._id} name={d.name} designation={d.designation} about={d.about} )*/ key={
              d._id
            }
          />
        ))}
      </div>
    </Layout>
  );
};

export default BOD;

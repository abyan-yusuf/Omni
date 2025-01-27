import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowroomDetails = () => {
  const { id } = useParams();
  const [showroom, setShowroom] = useState({});
  const [userCoordinates, setUserCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const getShowroom = async () => {
    try {
      const { data } = await axios.get(
        `https://omni-yxd5.onrender.com/api/v1/showrooms/single/${id}`
      );
      setShowroom(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShowroom();
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position);
        },
        (error) => console.log(error)
      );
    }
  }, []);
  return (
    <Layout>
      <h1 className="text-4xl text-center font-[Roboto] font-medium my-20">
        {showroom.name}
      </h1>
      <div className="mx-40 space-x-10 flex justify-between">
        <div className="basis-1/2 border-2 border-[#27] px-20 py-10">
          <p className="text-2xl font-[Roboto] font-light">
            Code: {showroom.code}
          </p>
          <p
            className="font-[Roboto] text-2xl font-light mt-5
          "
          >
            ADDRESS:
          </p>
          <p className="mt-3 text-lg font-[Roboto] font-light">
            Division: {showroom.address?.division}
          </p>
          <p className="mt-3 text-lg font-[Roboto] font-light">
            District: {showroom.address?.district}
          </p>
          <p className="mt-3 text-lg font-[Roboto] font-light">
            Area: {showroom.address?.area}
          </p>
          <p className="mt-3 text-lg font-[Roboto] font-light">
            Street Address: {showroom.address?.street}
          </p>
          <p className=" font-[Roboto] text-2xl font-light mt-5">Contact:</p>
          <p className="mt-3 text-lg font-[Roboto] font-light">
            Call At: {showroom.contact?.phone}
          </p>
          <p className="mt-3 text-lg font-[Roboto] font-light">
            Email: {showroom.contact?.email}
          </p>
        </div>
        <div className="basis-1/2 flex flex-col justify-evenly">
          <iframe
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDTsMTmbpn388SyT2h9u2-eNnqplHJvviE&q=${showroom.location?.coordinates[1]},${showroom.location?.coordinates[0]}`}
            allowFullScreen
            className="w-full h-80"
          ></iframe>
          {userCoordinates.latitude && userCoordinates.longitude && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${userCoordinates.latitude},${userCoordinates.longitude}&destination=${showroom.location?.coordinates[1]},${showroom.location?.coordinates[0]}`}
              target="_blank"
              class="flex items-center gap-2 px-5 py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow-lg transform transition hover:from-purple-500 hover:to-blue-500 hover:-translate-y-0.5 hover:shadow-xl w-40"
            >
              Directions <img src="/direction.svg" />
            </a>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShowroomDetails;

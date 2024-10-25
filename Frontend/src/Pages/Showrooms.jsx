import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import {
  getAreasByDistrict,
  getDistrictsByDivision,
  getDivisions,
} from "bd-geodata";

const Showrooms = () => {
  const [showrooms, setShowrooms] = useState([]);
  const [selectedDivison, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [areas, setAreas] = useState([]);
  const getAllShowrooms = async () => {
    try {
      let response = await axios.get(
        "https://omni-yxd5.onrender.com/api/v1/showrooms/all-showrooms"
      );
      setShowrooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllShowrooms();
  }, []);
  const getShowroomsByDivision = async () => {
    try {
      const { data } = await axios.post(
        "https://omni-yxd5.onrender.com/api/v1/showrooms/filtered-showrooms",
        {
          division: getDivisions().filter((d) => selectedDivison === d.id)[0]
                .name,
            district: getDistrictsByDivision(selectedDivison).filter(
              (d) => selectedDistrict === d.id
            )[0]?.name,
            area: selectedArea,
        }
        );
        setShowrooms(data);
    } catch (error) {
      console.error(error);
    }
    };
    useEffect(() => {
        if(selectedDivison)
      getShowroomsByDivision();
    }, [selectedDivison, selectedDistrict, selectedArea]);
  return (
    <Layout className="px-32 pt-16 font-[forum!important]">
      <h1
        className="font-['Roboto'] font-extrabold w-[60vh] text-4xl text-red-600 text-shadow-sm pb-16"
        to={"/"}
      >
        Omni Shoes Stores
      </h1>
      <div className="flex">
        <div className="basis-3/4 flex space-x-20 pe-36">
          <select
            className="select select-bordered max-w-xs rounded-none border-[#272727] text-[#272727] w-auto h-[0px!important] py-[0px!important] min-h-8 font-[forum!important] text-lg"
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option disabled selected>
              Select Division
            </option>
            {getDivisions().map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered max-w-xs rounded-none border-[#272727] text-[#272727] w-auto h-[0px!important] py-[0px!important] min-h-8 font-[forum!important] text-lg  focus:border-none"
                      onChange={(e) => { setSelectedDistrict(e.target.value);  setAreas(getAreasByDistrict(e.target.value))}}
          >
            <option disabled selected>
              Select District
            </option>
            {selectedDivison ? (
              getDistrictsByDivision(selectedDivison).map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))
            ) : (
              <option disabled>Select division first</option>
            )}
          </select>
                  <select className="select select-bordered max-w-xs rounded-none border-[#272727] text-[#272727] w-auto h-[0px!important] py-[0px!important] min-h-8 font-[forum!important] text-lg"
            onChange={(e) => setSelectedArea(e.target.value)}>
            <option disabled selected>
              Select Area
            </option>
            {areas ? (
              areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))
            ) : (
              <option disabled>Select district first</option>
            )}
          </select>
        </div>
        <div className="basis-1/4 flex items-end">
          <button className="text-white font-[Roboto] text-xl bg-red-600 px-6 py-2 rounded-xl">
            Find Near Me
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-10">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              District
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Area
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {showrooms.map((showroom) => (
            <tr key={showroom._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {showroom.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {showroom.address.district}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {showroom.address.area}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {showroom.address.street}
              </td>
              <td className="px-6">
                <a
                  href="#"
                  className="
                  py-3
                  text-left
                  text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider"
                >
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Showrooms;

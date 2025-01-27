import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import {
  getThanasByDistrict,
  getDistrictsByDivision,
  getDivisions,
} from "../data/index.js";
import { Link } from "react-router-dom";

const Showrooms = () => {
  const [showrooms, setShowrooms] = useState([]);
  const [selectedDivison, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedThana, setSelectedThana] = useState("");
  console.log(selectedThana);
  console.log(selectedDistrict);
  console.log(selectedDivison);

  const findNeabyShowrooms = async (latitude, longitude) => {
    try {
      setSelectedDivision(" ");
      setSelectedDistrict(" ");
      setSelectedThana(" ");
      const { data } = await axios.post(
        "https://omni-1-men7.onrender.com/api/v1/showrooms/nearby",
        {
          latitude,
          longitude,
        }
      );
      setShowrooms(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            findNeabyShowrooms(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => console.log(error)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllShowrooms = async () => {
    try {
      let response = await axios.get(
        "https://omni-1-men7.onrender.com/api/v1/showrooms/all-showrooms"
      );
      setShowrooms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShowrooms();
  }, []);
  const handleClearFilters = () => {
    setSelectedDivision(" ");
    setSelectedDistrict(" ");
    setSelectedThana(" ");
    getAllShowrooms();
  };
  return (
    <Layout className="px-32 pt-16 font-[forum!important] mx-10">
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
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              setSelectedDistrict(" ");
              setSelectedThana(" ");
            }}
            value={selectedDivison ? selectedDivison : " "}
          >
            <option disabled selected value={" "}>
              Select Division
            </option>
            {getDivisions().map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered max-w-xs rounded-none border-[#272727] text-[#272727] w-auto h-[0px!important] py-[0px!important] min-h-8 font-[forum!important] text-lg"
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setThanas(
                getThanasByDistrict(e.target.value).sort((a, b) =>
                  a.localeCompare(b)
                )
              );
              setSelectedThana(" ");
            }}
            value={selectedDistrict ? selectedDistrict : " "}
          >
            <option disabled selected value={" "}>
              Select District
            </option>
            {selectedDivison ? (
              getDistrictsByDivision(selectedDivison).map((district) => (
                <option key={district.district} value={district.district}>
                  {district.district}
                </option>
              ))
            ) : (
              <option disabled>Select division first</option>
            )}
          </select>
          <select
            className="select select-bordered max-w-xs rounded-none border-[#272727] text-[#272727] w-auto h-[0px!important] py-[0px!important] min-h-8 font-[forum!important] text-lg"
            onChange={(e) => {
              setSelectedThana(e.target.value);
            }}
            value={selectedThana ? selectedThana : " "}
          >
            <option disabled selected value={" "}>
              Select Thana
            </option>
            {selectedDistrict ? (
              getThanasByDistrict(selectedDistrict).map((thana) => (
                <option key={thana.thana} value={thana.thana}>
                  {thana.thana}
                </option>
              ))
            ) : (
              <option disabled>Select district first</option>
            )}
          </select>
        </div>
        <div className="basis-1/4 flex items-end">
          <button
            className="text-white font-[Roboto] text-xl bg-red-600 px-6 py-2 rounded-xl"
            onClick={getUserLocation}
          >
            Find Near Me
          </button>
        </div>
      </div>
      <button type="button" className="" onClick={handleClearFilters}>
        Clear Filters
      </button>
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
              Division
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
              Thana
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
          {showrooms
            .filter((showroom) => {
              if (selectedThana && selectedThana !== " ") {
                return showroom.address.area === selectedThana;
              } else if (selectedDistrict && selectedDistrict !== " ") {
                return showroom.address.district === selectedDistrict;
              } else if (selectedDivison && selectedDivison !== " ") {
                return showroom.address.division === selectedDivison;
              }
              return true; // No filtering if all are " "
            })
            .map((showroom) => (
              <tr key={showroom._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {showroom.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {showroom.address.division}
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
                  <Link
                    to={`/showrooms/details/${showroom._id}`}
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
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Showrooms;

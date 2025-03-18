import React from "react";

const DirectorCard = ({ name, designation, about, _id }) => {
  return (
    <div className="w-72 bg-gray-100 p-4 rounded-lg shadow-lg text-center">
      <div className="relative w-24 h-24 mx-auto">
        <img
          src={`http://backend.omnishoesbd.com/api/v1/directors/image/${_id}`}
          alt={name}
          className="w-24 h-24 object-cover rounded-full border-2 border-red-500"
        />
      </div>
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-red-500 text-sm font-medium">{designation}</p>
      <p className="text-gray-600 text-sm mt-2">{about}</p>
    </div>
    
  );
};

export default DirectorCard;

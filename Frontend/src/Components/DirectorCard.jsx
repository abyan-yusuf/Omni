import React from "react";

const DirectorCard = ({ name, designation, about, _id }) => {
  return (
    <div className="w-72 bg-[#D9D9D9] p-8 shadow-lg text-center mt-16 h-full flex flex-col">
      <div className="relative w-36 h-16 mx-auto">
        <img
          src={`http://backend.omnishoesbd.com/api/v1/directors/image/${_id}`}
          alt={name}
          className="w-36 h-36 object-cover rounded-full outline-1 outline-[#8D4949] absolute -top-[150%]"
        />
      </div>
      <p className="text-[#8D4949] text-md font-normal">{designation}</p>
      <h3 className="text-2xl font-semibold mt-2 text-left">{name}</h3>
      <p className="text-gray-600 text-sm mt-2 break-words text-left flex-grow">
        {about}
      </p>
    </div>
  );
};


export default DirectorCard;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ name, price, category, discount, id, admin }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://omni-yxd5.onrender.com/api/v1/categories/single/${category}`
      )
      .then((res) => {
        setCategoryName(res.data.name);
      });
  }, [category]);
  return (
    <Link
      className="card p-0 bg-base-100 w-[225px] hover:-translate-y-3 transition-transform duration-500 rounded-none"
      to={`${admin ? "/dashboard/products" : ""}/details/${id}`}
    >
      <figure className="h-[225px]">
        <img
          src={`https://omni-yxd5.onrender.com/api/v1/products/image/${id}`}
          alt="Shoes"
          className="h-auto w-full"
        />
      </figure>
      <div className="card-body pt-3 gap-[0.25rem]">
        <h2 className="text-md font-semibold text-center font -forum">
          {name.substring(0, 20) + (name.length > 20 ? "..." : "")}
        </h2>
        <p className="text-center">For {categoryName.slice(0, -1)}</p>
        <p className="font-semibold text-lg flex flex-wrap items-start text-center">
          {" "}
          <p
            className={
              discount !== price
                ? "line-through text-stone-500 "
                : "text-red-700 " + "whitespace-nowrap"
            }
          >
            Tk. {price}
          </p>
          {discount !== price && (
            <p className="ml-2 text-red-700 whitespace-nowrap">
              Tk. {discount}
            </p>
          )}
        </p>
        <div className="card-actions justify-end"></div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { Link } from "react-router-dom";

const ProductCard = ({ name, price, discount, id, admin, color, sizes }) => {
  
  return (
    <Link
      className="card p-0 bg-base-100 w-[270px] transition-transform duration-500 rounded-none hover:border-2 hover:w-[270px] hover:h-[388px] h-96 group"
      to={`${admin ? "/dashboard/products" : `/products/details/${id}`}`}
    >
      <figure className="h-[225px] mb-[14px]">
        <img
          src={`https://omni-yxd5.onrender.com/api/v1/products/image/${id}`}
          alt="Shoes"
          className="h-auto w-full px-2"
        />
      </figure>
      <ul className="flex space-x-2 justify-center invisible group-hover:visible">
        <li>{sizes[0]}</li>
        {sizes.length > 1 && <li>{sizes[1]}</li>}
        {sizes.length > 2 && <li>{sizes[2]}</li>}
        {sizes.length > 3 && <li>{sizes[3]}</li>}
        {sizes.length > 4 && <li>{sizes.length-4}+</li>}
        </ul>
      <div className="card-body pt-3 gap-[0.25rem] mt-[6px] ">
        <h2 className="text-md font-semibold text-center font -forum">
          {name}
        </h2>
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
        <div className="card-actions justify-end">
          <button className="btn w-full px-0 rounded-none mt-5 text-transparent text-lg font-normal  hover:bg-[red!important] bg-transparent border-none shadow-none group-hover:text-white group-hover:bg-black transition-all duration-500 z-10">Shop Now</button>
        </div>
        <div className="tooltip mt-2 z-20" data-tip={color}><div className={`w-7 h-7 rounded-full mx-auto invisible group-hover:visible`} style={{backgroundColor: color}}/></div>
      </div>
    </Link>
  );
};

export default ProductCard;

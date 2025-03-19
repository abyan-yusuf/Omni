import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[65vh] grid grid-cols-4 space-x-20 font-[forum] bg-footer border-t-2">
      <div className="">
        <h1
          className="font-['Roboto'] font-extrabold italic bg-white text-9xl text-red-600 h-[65vh] text-center ml-20"
          to={"/"}
          style={{
            writingMode: "vertical-rl",
            transform: "scale(-1)",
          }}
        >
          Omni
        </h1>
      </div>
      <div className="my-12 flex flex-col">
        <h4 className="text-[#CC0000] ml-10 text-3xl font-medium">MENU</h4>
        <ul className="ml-10 space-y-3 mt-5">
          <li>
            <Link>OMNI</Link>
          </li>
          <li>
            <Link>Men's Shoes</Link>
          </li>
          <li>
            <Link>Women's Shoes</Link>
          </li>
          <li>
            <Link>Children's Shoes</Link>
          </li>
          <li>
            <Link>Showrooms</Link>
          </li>
          <li>
            <Link>Board Of Directors</Link>
          </li>
        </ul>
      </div>
      <div className="my-12 flex flex-col pl-10">
        <h4 className="text-[#CC0000] text-3xl font-medium">HELP</h4>
        <ul className="space-y-3 mt-5">
          <li>
            <Link>Terms And Conditions</Link>
          </li>
          <li>
            <Link>Find Us</Link>
          </li>
          <li>
            <Link>Exchange and Return Policy</Link>
          </li>
          <li>
            <Link>Privacy Policy</Link>
          </li>
        </ul>
      </div>{" "}
      <div className="my-12 flex flex-col">
        <h4 className="text-[#CC0000] text-3xl font-medium">Stay Connected</h4>
        <p className="mt-5 w-56">
          Keep up with the latest styles, news and offers on our social
          channels.
        </p>
        <div className="h-10 mt-10 space-x-6 flex">
          <Link
            to={"https://www.facebook.com/p/Omni-Shoes-Ltd-100057208339435/"}
            target="_blank"
          >
            <img src="/facebook.png" className="h-full" />
          </Link>
          <Link>
            <img src="/insta.png" className="h-full" />
          </Link>
          <Link>
            <img src="/in.png" className="h-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

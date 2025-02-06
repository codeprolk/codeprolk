import React from "react";
import { IoMdSearch } from "react-icons/io";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Courses",
    link: "/courses",
  },
  {
    id: 3,
    name: "Services",
    link: "/services",
  },
  {
    id: 4,
    name: "Blog",
    link: "/blog",
  },
  {
    id: 5,
    name: "About",
    link: "/about",
  },
  {
    id: 6,
    name: "Contact",
    link: "/contact",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  return (
    <div className="shadow-md bg-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-blue-600 py-2">
        <div className="container flex justify-between items-center">
          <div>
            <a
              href="/"
              className="font-bold text-2xl sm:text-3xl flex gap-2 text-transparent bg-clip-text 
                   bg-gradient-to-r from-white via-blue-300 to-white
                   bg-[length:200%_200%] animate-gradient"
            >
              CODEPRO LK
            </a>
          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-blue px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
          </div>
        </div>
      </div>
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex hidden items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-4 hover:text-primary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

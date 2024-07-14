import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiAlignRight } from "react-icons/ci";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const [MobileNav, setMobileNav] = useState("hidden");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn == true && role === "admin"){
    links.splice(3,1)
  }
  if (isLoggedIn == true && role === "user"){
    links.splice(4,1)
  }
  return (
    <>
      <nav className=" relative bg-slate-400 text-white px-4 py-2 flex items-center justify-around z-50">
        <Link to="/" className="flex items-center justify-between gap-4 ">
          <img
            className="h-20 rounded-full"
            src="https://cdn.pixabay.com/photo/2024/01/28/16/17/ai-generated-8537858_640.png"
            alt="logo"
          />
          <h1 className="text-3xl text-white ">CoDEBaY</h1>{" "}
        </Link>
        <div className="nav-links-bookstore  flex items-center justify-between gap-4 ">
          <div className="hidden md:flex gap-4 ">
            {links.map((item, i) => (
              <div className="flex  items-center">
                {item.title === "Profile" || item.title === "Admin Profile" ? (
                  <Link
                    to={item.link}
                    className=" border border-lime-200 hover:scale-110 transition-all duration-500 px-2 rounded py-1 bg-white text-black hover:bg-yellow-500 hover:text-white"
                    key={i}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className=" hover:text-black hover:scale-110 transition-all duration-500"
                    key={i}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/Signup"
                className="px-2 rounded py-1 bg-white text-black hover:bg-yellow-500 hover:text-white "
              >
                SignUp
              </Link>
              <Link
                to="/Login"
                className="px-2 rounded py-1 bg-gray-800 text-white hover:bg-slate-300 hover:text-black"
              >
                LogIn
              </Link>
            </div>
          )}

          <button
            className="text-4xl md:hidden hover:text-zinc-600 hover:rotate-90 transition-all duration-300"
            onClick={() => {
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden");
            }}
          >
            <CiAlignRight />
          </button>
        </div>
      </nav>
      <div
        className={`${MobileNav} bg-white/30 backdrop-blur-lg  absolute top-0 right-0 h-[100vh] w-[25vh] z-40 flex flex-col items-center justify-center m-0`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className=" hover:text-black hover:scale-110 transition-all duration-500 m-8"
            key={i}
          >
            {item.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            {" "}
            <Link
              to="/Signup"
              className="px-2 rounded py-1 bg-white text-black hover:bg-yellow-500  hover:text-white m-8 "
            >
              SignUp
            </Link>
            <Link
              to="/Login"
              className="px-2 rounded py-1 bg-gray-800 text-white hover:bg-slate-300 hover:text-black m-8"
            >
              LogIn
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;

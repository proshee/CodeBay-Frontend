import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className="w-full flex justify-between items-center my-4 gap-2 lg:hidden">
          <Link
            to="/profile"
            className=" text-zinc-100 font-semibold w-full py-1 text-center hover:bg-zinc-900 rounded transition-all duration-500 bg-zinc-600"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className=" text-zinc-100 font-semibold w-full py-1  text-center hover:bg-zinc-900 rounded transition-all duration-500 bg-zinc-600"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className=" text-zinc-100 font-semibold w-full py-1  text-center hover:bg-zinc-900 rounded transition-all duration-500 bg-zinc-600"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex justify-between items-center my-4 gap-2 lg:hidden">
          <Link
            to="/profile"
            className=" text-zinc-100 font-semibold w-full py-1 text-center hover:bg-zinc-900 rounded transition-all duration-500 bg-zinc-600"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className=" text-zinc-100 font-semibold w-full py-1  text-center hover:bg-zinc-900 rounded transition-all duration-500 bg-zinc-600"
          >
            Add Books
          </Link>
         
        </div>
      )}
    </>
  );
};

export default MobileNav;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    history("/");
  };
  return (
    <div className="bg-gray-600 p-4 h-auto lg:h-[100%] rounded flex flex-col items-center justify-around">
      <div className="flex flex-col justify-center items-center">
        <img src={data.avatar} className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300 ">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-white hidden lg:block"></div>
      </div>
      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className=" text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-500"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className=" text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-500"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className=" text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-500"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className=" text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-500"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className=" text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-500"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className=" bg-zinc-900 w-3/6 lg:w-full mt-4 1g:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-500"
        onClick={handleLogout}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;

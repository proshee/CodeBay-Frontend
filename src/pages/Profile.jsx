import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Profile, setProfile] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://codebay.onrender.com/api/v1/get-user-information",
        { headers }
      );
      setProfile(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="h-screen bg-slate-200 px-2 md:px-12 py-8 flex flex-col lg:flex-row gap-4 text-white ">
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full lg:w-[20%] h-auto ">
            <Sidebar data = {Profile}/>
            <MobileNav />
          </div>
          <div className="w-full lg:w-[80%] overflow-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

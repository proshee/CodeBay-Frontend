import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({ address: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const changeAddress = (e) => {
    const { name, value } = e.target;
    setValue({ [name]: value });
    // console.log(Value)
  };
  const handleChange = async () => {
    await axios.put(
      "https://codebay.onrender.com/api/v1/update-address",Value,
      { headers }
    );
    // console.log(res.data.message);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://codebay.onrender.com/api/v1/get-user-information",
        { headers }
      );

      setProfileData(res.data);
      setValue({ address: res.data.address });
    };
    fetch();
  }, []);
  return (
    <>
      {!ProfileData && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {ProfileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>

          <div className="flex gap-12">
            <div className="">
              <label htmlFor="" className="text-gray-900">
                Username
              </label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="" className="text-gray-900">
                Email
              </label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="" className="text-gray-900">
              Address
            </label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={changeAddress}
            />
          </div>
          <div className="mt-4 flex justify-end ">
            <button
              className="bg-yellow-300 border border-red-300 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-700 hover:text-white hover:border-black transition-all duration-500"
              onClick={handleChange}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;

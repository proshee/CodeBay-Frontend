import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://codebay.onrender.com/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(res.data.data);
      // console.log(res);
    };
    fetch();
  }, [OrderHistory]);
  return (
    <>
      {!OrderHistory && (
        <div className="w-full h-[100%] flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100 ">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/man-finding-nothing-in-order-4006350-3309936.png"
              alt="no orders history"
              className="h-[50vh] "
            />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className=" h-[100%] p-0 md:p-4 text-gray-100">
          <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="  flex flex-col ">
            <div className="mt-4 bg-slate-800 md:w-full px-2 rounded md:py-2 md:px-4 flex flex-row  md:gap-2 justify-between ">
              <div className="md:w-[3%]">
                <h1 className="text-center">Sr.</h1>
              </div>
              <div className="md:w-[22%] ">
                <h1 className="">Books</h1>
              </div>
              <div className="md:w-[45%]">
                <h1 className="">Descriptions</h1>
              </div>

              <div className="md:w-[9%]">
                <h1 className="">Price</h1>
              </div>
              <div className="md:w-[16%]">
                <h1 className="">Status</h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block ">
                <h1 className="">Mode</h1>
              </div>
            </div>
            {OrderHistory.map((items, i) => (
              <div className="bg-slate-800 w-full rounded px-2 md:py-2 md:px-4 flex gap-7 md:gap-4 hover:bg-slate-900 hover:cursor-pointer mt-1">
                <div className="w-[3%]">
                  <h1 className=""> {i + 1}</h1>
                </div>
                <div className="w-[22%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>

                <div className="w-[45%]">
                  <h1 className="">{items.book.desc.slice(0, 50)} ...</h1>
                </div>
                <div className="w-[9%]">
                  <h1 className="">₹ {items.book.price}</h1>
                </div>
                <div className="w-[16%]">
                  <h1 className="font-semibold text-green-500">
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className=" text-red-500">{items.status}</div>
                    ) : (
                      items.status
                    )}
                  </h1>
                </div>
                <div className="w-none md:w-[5%] hidden md:block ">
                  <h1 className="text-sm text-zinc-400">COD</h1>
                </div>
              </div>
            ))}
            </div>
          </div>
      )}
    </>
  );
};

export default UserOrderHistory;

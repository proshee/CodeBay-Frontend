import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const deletItem = async (bookid) => {
    const res = await axios.put(
      `https://codebay.onrender.com/api/v1/remove-book-from-cart/${bookid}`,
      {},
      { headers }
    );
  };

  const PlaceOrder = async () => {
    try {
      const res = await axios.post(
        `https://codebay.onrender.com/api/v1/place-order`,
        { orders: Cart },
        { headers }
      );
      console.log(res.data)
      setTotal(0)
    //   navigate("/profile/orderHistory")
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://codebay.onrender.com/api/v1/get-all-books-from-cart",
        { headers }
      );
      setCart(res.data.data);
    };

    fetch();
  }, [Cart]);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => (total += parseInt(items.price)));
      setTotal(total);
    }
  }, [Cart]);

  return (
    <>
      {!Cart && (
        <div className=" bg-slate-900 h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className=" bg-slate-700 px-12 h-full md:h-screen py-8 flex flex-col lg:flex-row md:justify-between items-center md:items-start">
        {Cart.length === 0 && (
          <div className="h-screen w-full">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                Empty Cart
              </h1>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
                alt="empty cart"
                className="lg:h-[50vh]"
              />
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
            <div className="flex flex-col">
            <h1 className="text-5xl font-semibold text-gray-400 mb-8 ">
              Your Cart
            </h1>
          <div className="w-[100%]  flex flex-col overflow-auto ">
            
            {Cart.map((items, i) => (
              <div
                key={i}
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 backdrop-blur-sm bg-white/30 justify-between items-center "
              >
                <img
                  src={items.url}
                  alt="/"
                  className="h-[20vh] md:h-[10vh] object-cover"
                />
                <div ClassName="w-[50%] ">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 mx-4 md:mt-0 ">
                    {items.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 mx-4 hidden lg:block ">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 mx-4 hidden md:block lg:hidden ">
                    {items.desc.slice(0, 65)}...{" "}
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 mx-4 block md:hidden ">
                    {items.desc.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex flex-col w-full md:w-[20%] items-center justify-between gap-3">
                  <h2 className="text-zinc-100 text-3xl font-semibold">
                    ₹ {items.price}
                  </h2>
                  <button
                    className=" bg-red-100 text-2xl rounded p-2  hover:bg-red-300 transition-all duration-300"
                    onClick={() => deletItem(items._id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}
        
          <div className="mt-4 md:w-[25%] flex items-start justify-end">
            <div className="p-4 bg-slate-800 rounded">
              <h1 className="text-3xl text-gray-300 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} books</h2> <h2>₹ {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className=" bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-yellow-300 hover:text-gray-500 transition-all duration-500 "
                  onClick={PlaceOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Cart;

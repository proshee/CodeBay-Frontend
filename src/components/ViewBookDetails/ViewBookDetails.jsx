import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";



const ViewBookDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate()
  const [Books, setBooks] = useState();
  const [url, setUrl] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };
  const handleFavorite = async () => {
    const res = await axios.put(
      "https://codebay.onrender.com/api/v1/add-book-to-favorite",{},{headers}
    );
    alert((res.data.message));
  };
  const handleCart = async () => {
    const res = await axios.put(
      "https://codebay.onrender.com/api/v1/add-book-to-cart",{},{headers}
    );
    alert((res.data.message));
  };
  const handleDelete = async() => {
    const res = await axios.delete(
      "https://codebay.onrender.com/api/v1/delete-book",{headers}
    );
    // setTimeout(() => {
    //   console.log('Waited 5 seconds');
    // }, 2000);
    navigate("/all-books")
    alert((res.data.message));
  }
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://codebay.onrender.com/api/v1/get-book-by-id/${id}`
      );
      setBooks(res.data.data);
      setUrl(res.data.data.url);
      //   console.log(res.data.data);
    };
    fetch();
  }, []);
  return (
    <>
      {Books && (
        <div className="px-4 md:px-12 py-8 bg-zinc-800 flex flex-col lg:flex-row gap-8">
          <div className="p-4 lg:w-3/6 flex flex-col justify-between ">
            <h1 className="text-4xl text-zinc-300  font-semibold">
              {Books.title}
            </h1>
            <p className=" text-zinc-400 mt-1">by {Books.author}</p>
            <p className=" text-zinc-500 mt-4 text-xl text-justify">
              {Books.desc}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold"></p>
            <p className="flex mt-4 items-center justify-start text-zinc-100">
              {" "}
              <GrLanguage className="me-3" /> {Books.language}{" "}
            </p>
            <p className="mt-4 text-zinc-400 text-3xl">
              Price :₹ {Books.price}
            </p>
          </div>
          <div className="bg-slate-600 p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col lg:flex-row items-center justify-center rounded gap-8">
            {isLoggedIn === true && role === "user" && (
              <div className="flex md:flex-col gap-4">
                <button
                  className="bg-white rounded-full text-2xl p-2 "
                  onClick={handleFavorite}
                >
                  <FaHeartCirclePlus />
                </button>
                <button className="bg-white rounded-full text-2xl p-2 " onClick={handleCart}>
                  <BsCart4 />
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className="flex md:flex-col gap-4">
                <Link to={`/update-book/${id}`} className="bg-white rounded-full text-2xl p-2 ">
                  <FaRegEdit />
                </Link>
                <button className="bg-white rounded-full text-2xl p-2 " onClick={handleDelete}>
                  <MdDeleteOutline />
                </button>
              </div>
            )}
            <img
              src={url}
              alt="/"
              className="h-[50vh] lg:h-[80vh] rounded nt-4"
            />
          </div>
        </div>
      )}
      {!Books && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center ">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;

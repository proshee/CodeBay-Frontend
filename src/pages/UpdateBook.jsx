import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const res = await axios.put(
          "https://codebay.onrender.com/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(res.data.message);
        const path = `/view-book-details/${id}`
        navigate(path)
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://codebay.onrender.com/api/v1/get-book-by-id/${id}`
      );
      setData(res.data.data);
      //   console.log(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-gray-700 h-[100%] p-0 md:p-4">
      <h1 className=" text-3xl md:text-5xl font-semibold text-gray-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-slate-800 rounded">
        <div className="mt-4">
          <label className="text-gray-400"> Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-slate-900 text-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-400"> Title </label>
          <input
            type="text"
            className="w-full mt-2 bg-slate-900 text-zinc-100 p-2 outline-none"
            placeholder="Title of the Book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="text-gray-400"> Author </label>
          <input
            type="text"
            className="w-full mt-2 bg-slate-900 text-zinc-100 p-2 outline-none"
            placeholder="Author of the Book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label className="text-gray-400"> Language </label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-900 text-zinc-100 p-2 outline-none"
              placeholder="Language of the Book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label className="text-gray-400">₹ Price </label>
            <input
              type="number"
              className="w-full mt-2 bg-slate-900 text-zinc-100 p-2 outline-none"
              placeholder="Price of the Book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-gray-400">Description</label>
          <textarea
            className="w-full mt-2 bg-slate-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="Description of the Book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-amber-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-500 "
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;

import React from "react";
import { Link } from "react-router-dom";
import { CiBookmarkRemove } from "react-icons/ci";
import axios from "axios";

const BookCard = ({ data ,favorite }) => {
//   console.log(data);
const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid:data._id
};
const handleRemoveFavorite = async()=> {
  const res = await axios.put(
    "https://codebay.onrender.com/api/v1/remove-book-from-favorite",{},{headers}
  );

}
  return (
    <div className=" bg-slate-600 pt-2 rounded overflow-auto flex flex-col items-center h-[90%]">
    {favorite && <button className="text-3xl " onClick={handleRemoveFavorite}><CiBookmarkRemove /></button>}
      <Link to= {`/view-book-details/${data._id}`}>
        <div className="bg-slate-600 rounded p-4 flex flex-col justify-between ">
          <div className="bg-zinc-800 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh] rounded" />
          </div>
          <h1 className="mt-4 text-xl text-gray-100">{data.title}</h1>
          <p className="mt-2 text-zinc-400">By {data.author} </p>
          <p className="mt-2 text-zinc-200">₹ {data.price} </p>
          
        </div>
      </Link>
    </div>
  );
};

export default BookCard;

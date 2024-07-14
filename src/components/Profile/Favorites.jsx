import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
const Favorites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [FavBooks, setFavBooks] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://codebay.onrender.com/api/v1/get-all-books-from-favorite",
        { headers }
      );
      setFavBooks(res.data.data);
    };

    fetch();
  }, [FavBooks]);
  return (
    <>
      {FavBooks.length === 0 && (
        <div className="text-5xl text-gray-400 flex flex-col justify-center items-center w-full h-full">
        <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp" alt="no favorites" />
          No Favorites
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-scroll">
        {FavBooks &&
          FavBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favorite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favorites;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Books, setBooks] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://codebay.onrender.com/api/v1/get-some-books");
      setBooks(res.data.data);
        // console.log(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="flex flex-col mt-8 md:px-12  ">
      <div className="flex flex-col justify-center items-center">
      <h4 className="text-3xl text-gray-600">Newly Added Coding Books</h4>
      {!Books && <div className="flex  items-center justify-center my-8"><Loader /></div> }
      </div>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Books &&
          Books.map((items, i) => (
            <div key={i}>
              {" "}
              <BookCard data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;

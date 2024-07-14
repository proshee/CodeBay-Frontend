import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";



const Allbooks = () => {
    const [Books, setBooks] = useState();
    useEffect(() => {
      const fetch = async () => {
        const res = await axios.get("https://codebay.onrender.com/api/v1/get-all-books");
        setBooks(res.data.data);
          // console.log(res.data.data);
      };
      fetch();
    }, []);
  return (
    <div className="bg-slate-300 h-auto px-12 py-8">
        <h4 className="text-3xl text-gray-600 text-center">All Books</h4>
        {!Books && (
          <div className="flex h-screen items-center justify-center my-8">
            <Loader />
          </div>
        )}
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

export default Allbooks;

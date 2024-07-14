import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" lg:m-5 lg:h-[75vh] md:h-[80%] flex lg:flex-row flex-col-reverse items-center justify-center ">
      <div className="w-full  md:m-0  lg:w-3/6 h-auto md:h-[100%]  flex items-center justify-center">
        <img className=" md:w-[70%] lg:w-[90%]" src="/Hero.png" alt="hero" />
      </div>

      <div className="lg:w-[50%] w-full m-12 md:m-6 flex flex-col md:flex-row lg:flex-col md:justify-around lg:items-start lg:justify-center leading-relaxed ">
        <h1 className=" m-4 text-4xl md:text-6xl text-slate-500 md:text-left ">
          Journey Through the Written Code
        </h1>
        <div className="flex flex-col justify-center m-4 ">
        <p className="text-xl text-justify text-zinc-50 md:text-left ">
          Uncover captivating codes, enriching knowledge, and endless
          inspiration in our curated collection of books
        </p>
        <Link
          to="/all-books"
          className="bg-white text-black hover:bg-emerald-500 hover:border-gray-500 hover:text-white border text-xl rounded-full px-10 md:text-2xl text-center my-4 flex"
        >
          Let's Begin
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

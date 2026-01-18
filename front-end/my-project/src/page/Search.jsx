import React from "react";
import { motion } from "motion/react";
import { CiSearch } from "react-icons/ci";
import api from "../service/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuOrbit } from "react-icons/lu";
const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [random, setRandom] = useState([]);
  const navigate = useNavigate();
  const getSearch = async () => {
    const req = await api.get(`/orbit/search/${search.trim()}`);
    setResult(req.data.users);
  };

  const getrandom = async () => {
    try {
      const req = await api.get(`/orbit/random`);
      setRandom(req.data.users);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getrandom();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearch();
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="p-4 flex  flex-col gap-4">
      <motion.h1
        initial={{ scale: 0, y: -200, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "anticipate" }}
        className="text-4xl mx-auto flex items-center bg-clip-text text-transparent w-fit text-center p-4 font-bold  bg-linear-to-r from-[#0040ff]  via-[#ff00c3] to-[#00ffdd] "
      >
        Where Connections revolve
      </motion.h1>

      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "anticipate" }}
        className="relative w-full pb-8  hover:scale-102 duration-300 hover:translate-y-[-5px]"
      >
        <motion.input
          placeholder="Search users"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="border-2  shadow-2xl  border-gray-500 focus:border-blue-700  focus:ring-2 ring-blue-500 outline-0 w-full rounded-[10px] duration-300 hover:rounded-2xl p-2 pl-10"
        />
        <CiSearch className="absolute left-3 top-2 h-6 w-6 text-gray-500" />
      </motion.div>
      {search.length !== 0 && result.length == 0 && (
        <h1 className="text-center text-2xl text-gray-500">No user found</h1>
      )}
      <div className="flex flex-col gap-2">
        <motion.h1
          initial={{ scale: 0, y: -200, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "anticipate" }}
          className="text-transparent bg-clip-text bg-linear-to-r from-[#0040ff]  via-[#ff00c3] to-[#00ffdd] w-fit font-bold text-2xl"
        >
          Discover People
        </motion.h1>
        {result.length == 0 &&
          random.map((e) => (
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "anticipate" }}
              key={e._id}
              className=""
            >
              <div className="flex items-center justify-between shadow-2xl hover:scale-99 duration-300 p-2 rounded-2xl">
                <div className="flex gap-2">
                  <img
                    src={e.profilePicture.url}
                    alt="profile"
                    className="md:h-15 border-2 border-zinc-400 md:w-15 h-12 w-12  rounded-full object-cover"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/orbit/profile/${e.username}`);
                    }}
                  >
                    <h1 className="font-bold text-xl">{e.username}</h1>
                    <h1>{e.user}</h1>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/orbit/profile/${e.username}`);
                  }}
                  className="bg-linear-to-r 
                   from-blue-500 to-black text-white hover:scale-105 border-gray-400 border duration-300 shadow-2xl   font-bold cursor-pointer rounded-4xl  px-4 py-3 text-xs md:text-xl h-fit"
                >
                  View profile
                </button>
              </div>
            </motion.div>
          ))}
        {result.length > 0 &&
          result?.map((e) => (
            <div key={e._id} className="">
              <div className="flex items-center justify-between shadow-2xl hover:scale-99 duration-300 p-2 rounded-2xl">
                <div className="flex gap-2">
                  <img
                    src={e.profilePicture.url}
                    alt="profile"
                    className="md:h-15 md:w-15 h-12 w-12  rounded-full object-cover"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/orbit/profile/${e.username}`);
                    }}
                  >
                    <h1 className="font-bold text-xl">{e.username}</h1>
                    <h1>{e.user}</h1>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/orbit/profile/${e.username}`);
                  }}
                  className="bg-linear-to-r from-teal-500 to-black text-white hover:scale-105 border-gray-400 border duration-300 shadow-2xl   font-bold cursor-pointer rounded-4xl  px-4 py-3 text-xs md:text-xl h-fit"
                >
                  View profile
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;

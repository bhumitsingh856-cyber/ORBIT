import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import socket from "../socket";
import { useAuth } from "../context/context.jsx";
import timeAgo from "../service/timeago.js";
const Messages = () => {
  const navigate = useNavigate();
  const [chatlists, setChatlists] = useState([]);
  const [aichat, setAichat] = useState([]);
  const [online, setOnline] = useState([]);
  useEffect(() => {
    socket.on("onlineUsers", (data) => {
      setOnline(data);
    });
    return () => {
      socket.off("onlineUsers");
    };
  }, []);
  const chatlist = async () => {
    const req = await api.get("/orbit/getchatlist");
    setChatlists(req.data);
  };
  const getaichat = async () => {
    const req = await api.get("/orbit/getAichat");
    setAichat(req.data);
  };
  useEffect(() => {
    chatlist();
    getaichat();
  }, []);
  

  return (
    <div className="w-full h-screen p-2">
      <h1 className="text-5xl font-semibold pb-8 p-2 text-center">
        <span className="from-[#0040ff]  via-[#ff00c3] to-[#00ffdd]  text-transparent bg-clip-text bg-linear-to-r ">
          Messages
        </span>
      </h1>
      {/* <motion.div
        initial={{ scale: 0, y: -200, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "anticipate" }}
        className="relative w-full pb-4  hover:scale-102 duration-300 hover:translate-y-[-5px]"
      >
        <input
          placeholder="Search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="border-2  border-gray-500 focus:border-blue-700  focus:ring-2 ring-blue-500 outline-0 w-full rounded-[10px] duration-300 hover:rounded-2xl p-2 pl-10"
        />
        <CiSearch className="absolute left-3 top-2 h-6 w-6 text-gray-500" />
      </motion.div> */}
      <div className="p-2">
        {/* AI */}
        <div>
          <div
            onClick={() => navigate("/orbit/orbitAI")}
            className="flex items-center gap-2 hover:scale-102 duration-300 hover:translate-y-[-5px] shadow-2xl p-4 rounded-xl cursor-pointer"
          >
            <img
              className="w-10 h-10 object-cover  rounded-full"
              src="/src/assets/orbit.png"
              alt=""
            />
            <div className="flex flex-col w-full">
              <h1 className="font-bold flex justify-between text-xl ">
                ORBIT AI
                <span className="text-sm text-end">
                  {timeAgo(aichat.updatedAt)}
                </span>
              </h1>
              <h1 className="text-gray-500 line-clamp-1 ">
                {aichat.lastMessage}
              </h1>
            </div>
          </div>
        </div>
        {/* list */}
        {chatlists.map((e) => (
          <div
            key={e._id}
            onClick={() =>
              navigate(`/orbit/chats/${e.participants[0].username}`, {
                state: {
                  username: e.participants[0].username,
                  user: e.participants[0]._id,
                  id: e._id,
                  profilePicture: e.participants[0].profilePicture.url,
                },
              })
            }
            className="flex hover:scale-101 duration-300 cursor-pointer gap-2 shadow-2xl p-4 rounded-xl"
          >
            <div className="relative shrink-0 h-fit">
              <img
                className={`${
                  online?.includes(e.participants[0]._id)
                    ? "border-green-500 shadow-[0_0_5px_green]"
                    : "border-red-500 shadow-[0_0_5px_red]"
                } border-3 w-10 h-10 object-cover rounded-full`}
                src={e.participants[0].profilePicture.url}
                alt=""
              />
              <span className={`${
                  online.includes(e.participants[0]._id)
                    ? "bg-green-500 shadow-[0_0_10px_green]"
                    : "bg-red-500 shadow-[0_0_10px_red]"
                } absolute bottom-0 right-0 w-3 h-3 border-2 border-white  rounded-full`}>
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-4 ">
                <div className="text-xl w-full justify-between flex">
                  {e.participants[0].username}
                  <span>
                    <h1 className="text-sm font-bold">
                      {timeAgo(e.updatedAt)}
                    </h1>
                  </span>
                </div>
                {/* <div>
                  {online.includes(e.participants[0].username) ? (
                    <h1 className="text-green-500">● Online</h1>
                  ) : (
                    <h1 className="text-red-500">● Offline</h1>
                  )}
                </div> */}
              </div>
              <h1 className="text-gray-500 line-clamp-1">{e.lastMessage}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

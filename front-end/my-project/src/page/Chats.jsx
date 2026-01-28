import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import socket from "../socket";
import api from "../service/api";
import { useAuth } from "../context/context";
import { FaVideo } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import timeAgo from "../service/timeago";
import { FaRegImages } from "react-icons/fa";
import { set } from "react-hook-form";
const Chats = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showcall, setShowcall] = useState(false);
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);
  // const [showdelete, setShowdelete] = useState(fal kse);
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  });
  useEffect(() => {
    socket.emit("join room", state?.id);
    socket.on("receive", (data) => {
      setSending(false);
      setHistory(data?.message);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
    getchat();
  }, [state?.id]);

  const onSend = () => {
    if (message.trim() === "") {
      return;
    }
    setSending(true);
    const sender = {
      chatId: state?.id,
      message: message,
      user: user._id,
      file: file,
    };
    socket.emit("send", sender);
    console.log(sender);
    
    setMessage("");
    setFile(null);
  };
  const getchat = async () => {
    const req = await api.get(`/orbit/getchat/${state?.id}`);
    setHistory(req.data.message);
  };
  const deletemessage = async (id) => {
    try {
      const req = await api.delete(`/orbit/deleteMessage/${id}`);
      getchat();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-screen bg-center p-0.5 bg-linear-to-r via-purple-100 flex flex-col">
        {/* Header */}
        <div className="p-2 sticky top-0 bg-linear-to-r text-white from-teal-500 to-black rounded-full bg-no-repeat bg-cover flex justify-between shadow-2xl shrink-0 z-50">
          <div className="flex gap-2 items-center">
            <img
              loading="lazy"
              className="rounded-full border-2 border-white h-10 w-10 object-cover"
              src={state.profilePicture}
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="text-xl">{state.username}</h1>
              {isTyping && <h1>Typing...</h1>}
            </div>
          </div>
          <div className="flex gap-6 text-2xl">
            <button
              onClick={() => setShowcall(!showcall)}
              className="cursor-pointer duration-300 hover:scale-110"
            >
              <IoIosCall />
            </button>
            <button className="cursor-pointer duration-300 hover:scale-110">
              <FaVideo />
            </button>
          </div>
        </div>

        {/* Middle (scrollable area) */}
        <div className="flex-1 overflow-y-auto mb-4 p-2 ">
          {history.length === 0 && <h1>Start a convorsation</h1>}
          <div className="flex flex-col gap-2">
            {history &&
              history.map((e) =>
                // USER MESSAGE (RIGHT SIDE)
                e.user === user._id ? (
                  <div
                    key={e._id}
                    onDoubleClick={() => setShowdelete(!showdelete)}
                    className="flex justify-end gap-2"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="bg-linear-to-r from-sky-100 to-teal-100 border-2 border-white shadow-2xl px-4 py-2 rounded-xl">
                        
                          {e.image && (
                            <img
                              loading="lazy"
                              src={e.image}
                              className="rounded-xl max-w-xl"
                              alt=""
                            />
                          )}
                        
                        <p>{e.message}</p>
                        <p className="text-[10px] font-bold  text-gray-500 text-end">
                          {timeAgo(e.createdAt)}
                        </p>
                      </div>
                    </div>
                    <img
                      loading="lazy"
                      className="rounded-full h-10 w-10 object-cover"
                      src={user.profilepic.url}
                      alt=""
                    />
                  </div>
                ) : (
                  // OTHER USER MESSAGE (LEFT SIDE)
                  <div key={e._id} className="flex gap-2 ">
                    <img
                      loading="lazy"
                      className="rounded-full h-10 w-10 object-cover"
                      src={state.profilePicture}
                      alt=""
                    />
                    <div className="flex gap-2 items-center">
                      <div className="bg-linear-to-r max-w-xl to-green-200 from-blue-200 border-2 border-white shadow-2xl px-4 py-2 rounded-xl">
                     
                          {e.image && (
                            <img
                              loading="lazy"
                              src={e.image}
                              className="rounded-xl maxw-xl"
                              alt=""
                            />
                          )}
                        
                        <p>{e.message}</p>
                        <p className="text-[10px] font-bold  text-gray-500 text-end">
                          {timeAgo(e.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="flex justify-end p-4 animate-pulse">
            {sending && (
              <h1 className="text-xl w-fit bg-linear-to-r from-sky-500 to-green-200 p-3 rounded-lg">
                Sending message...
              </h1>
            )}
          </div>
          <div ref={ref}></div>
        </div>
        <div className="p-0.5">
          {file && (
            <label className="relative w-fit flex">
              <img
                loading="lazy"
                src={URL.createObjectURL(file)}
                className="max-w-42 border-2 rounded-lg border-white object-cover"
                alt=""
              />
              <div
                onClick={() => {
                  setFile(null);
                }}
                className="hover:text-6xl duration-300 absolute w-full font-extralight flex justify-center items-center rounded-lg bg-black/70 text-white text-4xl h-full"
              >
                x
              </div>
            </label>
          )}
        </div>
        {/* Chat input */}
        <div className="sticky rounded-full bottom-0 z-50 bg-linear-to-r from-red-500 to-black p-2 flex gap-2 shrink-0">
          <img
            loading="lazy"
            src={user.profilepic.url}
            className="w-10 border-2 border-white object-cover rounded-full h-10"
            alt=""
          />
          <input
            placeholder="Type message..."
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
              socket.emit("typing", state?.id);
              setTimeout(() => {
                socket.emit("stop typing", state?.id);
              }, 2000);
            }}
            value={message}
            className="border-2 border-gray-200 bg-white hover:scale-102 focus:border-blue-700
                 focus:ring-2 ring-blue-500 outline-0 w-full shadow-2xl
                 rounded-full duration-300 p-2 pl-4"
          />
          <label className="flex items-center bg-green-700 px-2 rounded-full">
            <FaRegImages className="text-white text-2xl" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </label>
          <button
            onClick={() => onSend()}
            className="bg-linear-to-r text-white border-2 shadow-2xl border-gray-200  font-bold cursor-pointer hover:scale-105 from-sky-500 to-teal-500 duration-300  flex items-center gap-2 rounded-full px-6 "
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chats;

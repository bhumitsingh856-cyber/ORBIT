import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { TbPlanet } from "react-icons/tb";
import api from "../service/api";
import { useAuth } from "../context/context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion } from "framer-motion";
const Aichat = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessage] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const getmessages = async () => {
    try {
      const req = await api.get("/orbit/getOrbitAiMessage");

      setMessage(req.data.message);
    } catch (error) {
      console.log(error);
    }
  };
   function timeAgo(date) {
      const diff = Date.now() - new Date(date);
      const min = Math.floor(diff / 60000);
      if (min < 1) return "just now";
      if (min < 60) return `${min}min ago`;
      const hr = Math.floor(min / 60);
      if (hr < 24) return `${hr}hr ago`;
      const day = Math.floor(hr / 24);
      return `${day}day ago`;
    }
  
  useEffect(() => {
    getmessages();
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (!prompt || prompt.trim() === "") {
        return;
      }
      setMessage((prev) => [
        ...prev,
        { role: "user", content: prompt, createdAt: new Date().toISOString() },
      ]);
      if (prompt.toLowerCase().startsWith("generate")) {
        const res = await api.post("/orbit/generateImage", { prompt });
        setLoading(false);
        setPrompt("");
        const generatedMessage = res.data;
        setMessage((prev) => [...prev, generatedMessage]);
      } else {
        const res = await api.post("/orbit/genOrbit", { prompt });
        setLoading(false);
        setPrompt("");
        const generatedMessage = res.data;
        setMessage((prev) => [...prev, generatedMessage]);
      }
    } catch (error) {
      console.error("Error generating message:", error);
    }
  };
  return (
    <div className="h-screen flex flex-col ">
      {/* Header */}
      <div className="pb-1 z-50 sticky bg-linear-to-r  via-[#ffea00] to-[#00ffdd] from-red-500 rounded-b-lg top-0 shrink-0">
        <div className="flex gap-2 p-2 rounded-b-lg items-center bg-linear-to-r from-gray-300 to-white">
          <img
            className="rounded-full h-10 w-10 object-cover"
            src="/src/assets/orbit.png"
            alt=""
          />

          <h1 className="text-xl font-bold">ORBIT AI</h1>
        </div>
      </div>

      {/* Middle (scrollable area) */}
      <div className="flex-1 overflow-y-auto p-2">
        {message?.map((e) => (
          <div key={e._id} className="mb-4">
            {e.role === "user" ? ( 
              // USER MESSAGE (RIGHT SIDE)
              <div className="flex gap-2 justify-end">
                <div className="bg-linear-to-r from-sky-100 border-2 border-blue-200 to-teal-50 from blue p-2 flex flex-col max-w-xl items-end rounded-lg shadow-2xs">
                  {e.content}
                  <h1 className="text-[10px] text-gray-500 font-bold ">
                    {timeAgo(e.createdAt)}
                  </h1>
                </div>
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={user.profilepic.url}
                  alt="user"
                />
              </div>
            ) : (
              // ORBIT AI MESSAGE (LEFT SIDE
              <div className="flex gap-2 ">
                <img
                  className="rounded-full md:h-10 md:w-10 w-7 h-7 object-cover"
                  src="/src/assets/orbit.png"
                  alt="orbit ai"
                />
                <div className="shadow-2xl bg-linear-to-r border-2 border-blue-100 from-red-50 via-yellow-50 to-teal-50 p-3 rounded-lg max-w-2xl text-sm overflow-hidden">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code({ inline, className, children }) {
                        if (inline) {
                          return (
                            <code className="bg-gray-300 px-1 rounded text-xs wrap-break-word">
                              {children}
                            </code>
                          );
                        }

                        return (
                          <div className="w-full overflow-x-auto">
                            <pre className="rounded-lg w-full max-w-full overflow-x-auto">
                              <code
                                className={`${className} block max-w-full whitespace-pre`}
                              >
                                {children}
                              </code>
                            </pre>
                          </div>
                        );
                      },
                    }}
                  >
                    {e.content}
                  </ReactMarkdown>
                  {e.image && (
                    <img
                      className="max-h-130  aspect-square object-cover"
                      src={e.image}
                      alt=""
                    />
                  )}
                  <h1 className="text-end text-[10px] font-extrabold text-gray-500">
                    {timeAgo(e.createdAt)}
                  </h1>
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 mb-4">
            <img
              className="rounded-full md:h-10 md:w-10 w-7 h-7 object-cover"
              src="/src/assets/orbit.png"
              alt="orbit ai"
            />
            <div className=" bg-linear-to-r border-2 border-blue-100 from-red-50 via-yellow-50 to-teal-50 p-4 rounded-lg">
              <div className="flex items-center gap-1">
                ORBIT AI is thinking
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{
                    duration: 0.5,
                    repeatType: "mirror",
                    delay: 0.3,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 bg-linear-to-r from-blue-500 to-green-500  rounded-full "
                ></motion.span>
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{
                    duration: 0.5,
                    repeatType: "mirror",
                    delay: 0.5,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 bg-linear-to-r from-blue-500 to-green-500  rounded-full  "
                ></motion.span>
                <motion.span
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{
                    duration: 0.5,
                    repeatType: "mirror",
                    delay: 0.7,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 bg-linear-to-r from-blue-500 to-green-500  rounded-full "
                ></motion.span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chat input */}
      <div className="sticky border-t-2 rounded-t-lg border-sky-400 flex gap-2 bottom-0 z-50 bg-white p-2 shrink-0">
        <input
          placeholder="Type message..."
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          className="border-2 border-zinc-400 hover:scale-102 focus:border-blue-700
                 focus:ring-2 ring-blue-500 outline-0 w-full
                 rounded-full duration-300 p-2 pl-4"
        />
        <button
          onClick={handleGenerate}
          className="bg-linear-to-r border-2 shadow-2xl border-yellow-200  font-bold cursor-pointer hover:scale-105 duration-300 from-red-500 flex items-center gap-2  via-[#ffea00] to-[#00ffdd] rounded-full px-6 "
        >
          Send <TbPlanet />
        </button>
      </div>
    </div>
  );
};

export default Aichat;

import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../context/context";
import { useNavigate } from "react-router-dom";
import Sure from "./Sure.jsx";
import orbit from "../assets/orbit.png";
const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showcnf, setShowcnf] = useState(false);
  const [title, setTitle] = useState("");
  function formatDate(isoString) {
    if (!isoString) return "";
    const dateObj = new Date(isoString);
    return dateObj.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return (
    <>
      <Sure
        cnf={logout}
        showcnf={showcnf}
        setShowcnf={setShowcnf}
        title={title}
      ></Sure>
      <div className="hidden   pr-1 bg-linear-to-b from-[#0040ff]  via-[#ff00c3] to-[#00ffdd] sticky top-0 md:block list-none h-screen ">
        <div className="flex bg-white flex-col justify-between h-screen">
          <div>
            <motion.li
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "backOut" }}
              whileTap={{
                rotateZ: 360,
                rotateY: 360,
                rotateX: 360,
                transition: { duration: 1 },
              }}
              className="flex gap-2  items-center cursor-pointer p-4 "
            >
              <img
                className="w-12 h-12 object-cover   rounded-full"
                src={orbit}
                alt=""
              />
              <span className=" font-bold items-center text-6xl text-transparent bg-clip-text  bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd]">
                RBIT
              </span>
            </motion.li>
            <motion.li
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "backInOut" }}
              className="cursor-pointer hover:scale-110 duration-150  p-4 "
            >
              <Link
                to="/orbit/postpage"
                className="flex  hover:bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd] p-2 rounded-xl gap-4 font-bold items-center text-xl"
              >
                <FaHome className="text-3xl" /> Home
              </Link>
            </motion.li>
            <motion.li
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "backInOut" }}
              className="cursor-pointer hover:scale-110 duration-150  p-4 "
            >
              <Link to="/orbit/searchpage" className="flex hover:bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd] p-2 rounded-xl gap-4 font-bold items-center text-xl">
                <CiSearch className="text-3xl" /> Search
              </Link>
            </motion.li>
            <motion.li
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "backInOut" }}
              className="cursor-pointer hover:scale-110 duration-150  p-4 "
            >
              <Link
                to="/orbit/createpost"
                className="flex hover:bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd] p-2 rounded-xl gap-4 font-bold items-center text-xl"
              >
                <IoIosAddCircleOutline className="text-3xl" />
                Create Post
              </Link>
            </motion.li>
            <motion.li
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "backInOut" }}
              className="cursor-pointer hover:scale-110 duration-150  p-4 "
            >
              <Link to="/orbit/messages" className="flex hover:bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd] p-2 rounded-xl gap-4 font-bold items-center text-xl">
                <IoIosChatboxes className="text-3xl" />
                Messages
              </Link>
            </motion.li>
            <motion.li
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "backInOut" }}
              className="cursor-pointer hover:scale-110 duration-150  p-4 "
            >
              <Link
                to="/orbit/userprofilepage"
                className="flex hover:bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd] p-2 rounded-xl gap-4 font-bold items-center text-xl"
              >
                <img
                  className="h-7 object-cover rounded-full w-7"
                  src={user?.profilepic.url}
                  alt=""
                />
                Profile
              </Link>
            </motion.li>
            <motion.li
              initial={{ x: -100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "backInOut" }}
              className="cursor-pointer hover:scale-110 duration-150  p-4 "
            >
              <div
                onClick={() => {
                  setTitle("Log-Out");
                  setShowcnf(!showcnf);
                }}
                className="flex hover:bg-linear-to-r from-red-500  via-[#ffea00] to-[#00ffdd] p-2 rounded-xl gap-4 font-bold items-center text-xl"
              >
                <MdLogout className="text-3xl" />
                Log-out
              </div>
            </motion.li>
          </div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "backOut" }}
            className=" mb-4 before:absolute  before:left-0 before:w-0 hover:before:w-full before:h-[12%]  before:bg-linear-to-r before:duration-300 rounded-[5px] before:from-[#10f]  before:via-[#00ffe1] before:to-[#9d00ff] before:rounded-[10px] flex justify-center]"
          >
            <div className="flex z-10  items-center gap-3">
              <img
                className="w-13 h-13 ml-1 object-cover rounded-full"
                src={user?.profilepic.url}
                alt=""
              />
              <div className="flex flex-col  ">
                <h1 className="text-2xl">{user?.user}</h1>
                <h1 className="text-l">{user?.username}</h1>
                <h1>Joined on : {formatDate(user?.joined)}</h1>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
